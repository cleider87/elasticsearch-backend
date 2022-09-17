import { Injectable } from '@nestjs/common';

@Injectable()
export class MonitoringService {
  get currentMicroserviceVersion() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../../../package.json').version;
  }
}
