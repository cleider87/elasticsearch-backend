import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { titleApi } from '../../common/constants/common-api.constants';
import { MonitoringService } from '../services/monitoring.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  @ApiOperation({ description: 'This would be used by monitoring system' })
  health() {
    const version = this.monitoringService.currentMicroserviceVersion;

    return {
      statusCode: HttpStatus.OK,
      message: `${titleApi} it's OK!`,
      version,
    };
  }
}
