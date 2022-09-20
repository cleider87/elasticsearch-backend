import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadDto } from '../dtos/upload.dto';
import { BulkService } from '../services/bulk.service';

@ApiTags('Bulk')
@Controller('bulk')
export class BulkController {
  constructor(private readonly bulkService: BulkService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Bulk update', type: UploadDto })
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, '/tmp');
        },
        filename: function (req, file, cb) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.fieldname + '.csv');
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.bulkService.processCSV(file);
  }
}
