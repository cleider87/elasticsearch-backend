import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { castHits } from '../../common/utils/search.util';
import { PageMetaDto } from '../../common/dtos/page-meta.dto';
import { PageDto } from '../../common/dtos/page.dto';
import { politiciansIndex } from '../constants/politicians.constant';
import { SearchPoliticiansDto } from '../dtos/search-politicians.dto';
import { Politician } from '../entities/politician.entity';

@Injectable()
export class PoliticiansService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async create(politician: any) {
    await this.elasticsearchService.index({
      index: politiciansIndex,
      body: politician,
    });

    return this.elasticsearchService.search({
      index: politiciansIndex,
    });
  }

  public async searchElastic(searchPoliticiansDto: SearchPoliticiansDto) {
    const { party, gender, fullName, skip, take } = searchPoliticiansDto;

    let must;
    const queries = [fullName, party].filter(Boolean);
    if (queries.length > 0) {
      if (queries.length > 1) {
        must = [
          {
            match: {
              fullName: fullName
                ? {
                    query: fullName,
                    fuzziness: 'auto',
                  }
                : undefined,
            },
          },
          {
            match: {
              partyFilter: party
                ? {
                    query: `*${party.toLowerCase()}*`,
                  }
                : undefined,
            },
          },
        ];
      } else {
        must = {
          match: fullName
            ? {
                fullName: {
                  query: fullName,
                  fuzziness: 'auto',
                },
              }
            : {
                partyFilter: {
                  query: `*${party.toLowerCase()}*`,
                },
              },
        };
      }
    } else {
      must = { match_all: {} };
    }

    let query;

    const hasFilters = [gender].filter(Boolean).length > 0;

    if (hasFilters) {
      query = {
        bool: {
          must,
          filter: {
            term: {
              gender: gender ? gender.toLowerCase() : undefined,
            },
          },
        },
      };
    } else {
      query = {
        bool: {
          must,
        },
      };
    }

    const search = {
      index: politiciansIndex,
      query,
      from: skip,
      size: take,
    };

    const { hits } = await this.elasticsearchService.search<Politician>(search);

    const pageMetaDto = new PageMetaDto({
      itemCount: hits.total['value'],
      pageOptionsDto: searchPoliticiansDto,
    });
    return new PageDto(hits.hits.map(castHits<Politician>), pageMetaDto);
  }

  public async getById(id) {
    const { hits } = await this.elasticsearchService.search({
      index: politiciansIndex,
      query: {
        match: {
          _id: id,
        },
      },
    });

    return hits.hits.map(castHits<Politician>)[0];
  }

  public async update(id: string, politician: Partial<Politician>) {
    const script = Object.entries(politician).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    await this.elasticsearchService.updateByQuery({
      index: politiciansIndex,
      body: {
        query: {
          match: {
            _id: id,
          },
        },
        script: {
          source: script,
        },
      },
    });

    return this.getById(id);
  }

  public async deletePolitician(id: string) {
    await this.elasticsearchService.deleteByQuery({
      index: politiciansIndex,
      body: {
        query: {
          match: {
            _id: id,
          },
        },
      },
    });
    return null;
  }
}
