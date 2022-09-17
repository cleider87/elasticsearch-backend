import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { MonitoringService } from './services/monitoring.service';

@Module({
  controllers: [HealthController],
  providers: [MonitoringService],
})
export class HealthModule {}
