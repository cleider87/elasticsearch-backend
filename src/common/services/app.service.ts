import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { politiciansIndex } from '../../politicians/constants/politicians.constant';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  private async createIndex() {
    const checkIndex = await this.elasticsearchService.indices.exists({
      index: politiciansIndex,
    });

    if (!checkIndex) {
      await this.elasticsearchService.indices.create({
        index: politiciansIndex,
        body: {
          mappings: {
            properties: {
              fullName: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              party: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              partyFilter: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              gender: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              occupation: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              occupationFilter: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              community: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              institution: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
              baseSalary: {
                type: 'long',
              },
              monthlyPayment: {
                type: 'long',
              },
              yearlyPayment: {
                type: 'long',
              },
              complementSalary: {
                type: 'long',
              },
              extraPay: {
                type: 'long',
              },
              otherAllowancesAndIndemnities: {
                type: 'long',
              },
              threeYearsSalary: {
                type: 'long',
              },
              observations: {
                type: 'text',
                fields: {
                  keyword: {
                    type: 'keyword',
                    ignore_above: 256,
                  },
                },
              },
            },
          },
        },
      });
    }
  }
  onModuleInit() {
    Logger.log(`Initialization...`);
    this.createIndex();
  }
}
