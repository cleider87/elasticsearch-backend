import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { politiciansIndex } from '../../politicians/constants/politicians.constant';
import { Politician } from '../../politicians/entities/politician.entity';
import { PoliticianMapping } from '../dtos/politician-mapping.dto';

@Injectable()
export class BulkService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async processCSV(file: Express.Multer.File) {
    const politicians = [];
    let skipHeader = false;
    fs.createReadStream(file.path)
      .pipe(csv({ separator: ';', headers: Object.keys(PoliticianMapping) }))
      .on('data', (politician: Politician) => {
        if (skipHeader) {
          politicians.push(
            { index: { _index: politiciansIndex } },
            { ...politician },
          );
        } else {
          skipHeader = true;
        }
      })
      .on('end', async () => {
        const { errors, took } = await this.elasticsearchService.bulk({
          operations: politicians,
        });
        if (errors) {
          console.log(errors);
          return false;
        }
        return took;
      });
  }
}
