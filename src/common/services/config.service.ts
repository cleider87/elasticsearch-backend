import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  constructor(filePath?: string) {
    dotenv.config({ path: filePath || '.env' });
  }

  get portToListen() {
    return this.get('PORT') || 3000;
  }

  get(key: string): string {
    return process.env[key];
  }

  isDevelopmentEnvironment() {
    return this.get('NODE_ENV') === 'development';
  }

  isProductionEnvironment() {
    return this.get('NODE_ENV') === 'production';
  }
}
