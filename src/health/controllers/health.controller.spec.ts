import { Test, TestingModule } from '@nestjs/testing';
import { MonitoringService } from '../services/monitoring.service';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let appController: HealthController;
  let healthResponse = null;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [MonitoringService],
    }).compile();

    appController = app.get<HealthController>(HealthController);
    healthResponse = appController.health();
  });

  describe('/health', () => {
    it('should return "Health Controller" status 200', () => {
      expect(healthResponse.statusCode).toBe(200);
    });

    it('should return statusCode', () => {
      expect(healthResponse).toHaveProperty('statusCode');
    });

    it('should have message', () => {
      expect(healthResponse).toHaveProperty('message');
    });

    it('should have version', () => {
      expect(healthResponse).toHaveProperty('version');
    });
  });
});
