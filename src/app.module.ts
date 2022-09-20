import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PoliticiansModule } from './politicians/politicians.module';
import { GlobalModule } from './common/global.module';
import { HealthModule } from './health/health.module';
import { SearchModule } from './common/search.module';
import { BulkModule } from './bulk/bulk.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    GlobalModule,
    SearchModule,
    HealthModule,
    PoliticiansModule,
    BulkModule,
    StatisticsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
