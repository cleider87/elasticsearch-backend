import { ApiProperty } from '@nestjs/swagger';
import { Politician } from '../../politicians/entities/politician.entity';

export class Statistics {
  avg: number;
  median: number;
}

export class StatisticsDto {
  @ApiProperty({ description: 'top10', type: () => [Politician] })
  public top10: Politician[];

  @ApiProperty({ description: 'statistics', type: Statistics })
  public statistics: Statistics;
}
