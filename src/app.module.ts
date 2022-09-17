import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AppController } from './app.controller';
import { GlobalModule } from './common/global.module';
import { ConfigService } from './common/services/config.service';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    GlobalModule,
    ElasticsearchModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
