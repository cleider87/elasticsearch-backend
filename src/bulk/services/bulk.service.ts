import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { PoliticiansService } from '../../politicians/services/politicians.service';
import { politiciansIndex } from '../../politicians/constants/politicians.constant';
import { Politician } from '../../politicians/entities/politician.entity';
import { PoliticianMapping } from '../dtos/politician-mapping.dto';

@Injectable()
export class BulkService {
  constructor(private readonly politiciansService: PoliticiansService) {}

  async processCSV(file: Express.Multer.File) {
    const castAmount = (amount) =>
      typeof amount === 'string' && amount.length > 0
        ? parseFloat(amount)
        : +amount;

    const politicians = [];
    let skipHeader = false;
    fs.createReadStream(file.path)
      .pipe(csv({ separator: ';', headers: Object.keys(PoliticianMapping) }))
      .on('data', (politician: Politician) => {
        const {
          fullName,
          party,
          partyFilter,
          gender,
          occupation,
          occupationFilter,
          community,
          institution,
          baseSalary,
          monthlyPayment,
          yearlyPayment,
          complementSalary,
          extraPay,
          otherAllowancesAndIndemnities,
          threeYearsSalary,
          observations,
        } = politician;

        const payload = {
          fullName,
          party,
          partyFilter,
          gender,
          occupation,
          occupationFilter,
          community,
          institution,
          baseSalary: castAmount(baseSalary),
          monthlyPayment: castAmount(monthlyPayment),
          yearlyPayment: castAmount(yearlyPayment),
          complementSalary: castAmount(complementSalary),
          extraPay: castAmount(extraPay),
          otherAllowancesAndIndemnities: castAmount(
            otherAllowancesAndIndemnities,
          ),
          threeYearsSalary: castAmount(threeYearsSalary),
          observations,
        };

        if (skipHeader) {
          politicians.push(
            { index: { _index: politiciansIndex } },
            { ...payload },
          );
        } else {
          skipHeader = true;
        }
      })
      .on('end', async () => {
        this.politiciansService.bulkCreate(politicians);
      });
  }
}
