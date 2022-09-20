import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatisticsDto } from '../dtos/statistics.dto';
import { StatisticsService } from '../services/statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get()
  @ApiOperation({
    description: 'Statistics',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: StatisticsDto })
  public async search(): Promise<StatisticsDto> {
    return this.statisticsService.getStatistics();
  }
}
