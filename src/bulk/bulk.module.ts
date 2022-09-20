import { Module } from '@nestjs/common';
import { GlobalModule } from '../common/global.module';
import { SearchModule } from '../common/search.module';
import { PoliticiansService } from '../politicians/services/politicians.service';
import { BulkController } from './controllers/bulk.controller';
import { BulkService } from './services/bulk.service';

@Module({
  imports: [GlobalModule, SearchModule],
  controllers: [BulkController],
  providers: [PoliticiansService, BulkService],
})
export class BulkModule {}
