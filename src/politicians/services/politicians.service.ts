import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
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

    if (fullName) {
      must = {
        match: {
          fullName: {
            query: fullName,
            fuzziness: 'auto',
          },
        },
      };
    } else {
      must = { match_all: {} };
    }

    let query;

    if ([party, gender].filter(Boolean).length > 0) {
      query = {
        bool: {
          must,
          filter: {
            term: {
              party: party ? party.toLowerCase() : undefined,
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
    return new PageDto(hits.hits.map(this.castHits), pageMetaDto);
  }

  public async getById(id) {
    const { hits } = await this.elasticsearchService.search({
      index: politiciansIndex,
      query: {
        match: {
          id,
        },
      },
    });

    return hits.hits.map(this.castHits)[0];
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

  private castHits(hit: SearchHit<Politician>): Politician {
    return Object.assign({ id: hit._id }, hit._source);
  }
}
