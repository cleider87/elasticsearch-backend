import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { castHits } from '../../common/utils/search.util';
import { politiciansIndex } from '../../politicians/constants/politicians.constant';
import { Politician } from '../../politicians/entities/politician.entity';

@Injectable()
export class StatisticsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  public async getStatistics() {
    const { hits, aggregations } = await this.elasticsearchService.search({
      index: politiciansIndex,
      query: {
        match_all: {},
      },
      aggs: {
        avg_grade: { avg: { field: 'baseSalary' } },
        review_variability: {
          median_absolute_deviation: {
            field: 'baseSalary',
          },
        },
      },
      size: 10,
      sort: [
        {
          baseSalary: {
            order: 'desc',
          },
        },
      ],
    });

    return {
      top10: hits.hits.map(castHits<Politician>),
      statistics: {
        avg: aggregations.avg_grade['value'],
        median: aggregations.review_variability['value'],
      },
    };
  }
}
