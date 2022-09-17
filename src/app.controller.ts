import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { titleApi } from './common/constants/common-api.constants';

@ApiTags('Elasticsearch Root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({
    description: 'Some ELB use this endpoint for enable the instance',
  })
  getRoot(): string {
    return titleApi;
  }
}
