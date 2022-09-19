import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';

export class SearchPoliticiansDto extends PageOptionsDto {
  @ApiProperty({ description: 'fullName', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public fullName?: string;

  @ApiProperty({ description: 'party', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public party?: string;

  @ApiProperty({ description: 'gender', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public gender?: string;
}
