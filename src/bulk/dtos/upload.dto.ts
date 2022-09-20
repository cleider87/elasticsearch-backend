import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../common/interfaces/file.interface';

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: File;
}
