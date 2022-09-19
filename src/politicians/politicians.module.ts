import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from '../common/search.module';
import { GlobalModule } from '../common/global.module';
import { PoliticiansController } from './controllers/politicians.controller';
import { PoliticiansService } from './services/politicians.service';

@Module({
  imports: [GlobalModule, ConfigModule, SearchModule],
  controllers: [PoliticiansController],
  providers: [PoliticiansService],
})
export class PoliticiansModule {}
