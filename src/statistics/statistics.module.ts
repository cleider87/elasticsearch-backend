import { Module } from '@nestjs/common';
import { SearchModule } from '../common/search.module';
import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [SearchModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
