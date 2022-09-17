import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { GlobalModule } from './common/global.module';
import { HealthModule } from './health/health.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GlobalModule, HealthModule],
      controllers: [AppController],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should be defined AppController', () => {
    expect(appController).toBeDefined();
  });
});
