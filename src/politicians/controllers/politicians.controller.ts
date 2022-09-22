import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';
import { PageDto } from '../../common/dtos/page.dto';
import { SearchPoliticiansDto } from '../dtos/search-politicians.dto';
import { Politician } from '../entities/politician.entity';
import { PoliticiansService } from '../services/politicians.service';

@ApiTags('Politicians')
@Controller('politicians')
export class PoliticiansController {
  constructor(private readonly politiciansService: PoliticiansService) {}

  @Post()
  create(@Body() politician: Politician): any {
    return this.politiciansService.create(politician);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Get politician by id',
  })
  public async searchById(@Param('id') id: string) {
    console.log(id);
    return this.politiciansService.getById(id);
  }

  @Get()
  @ApiOperation({
    description: 'List of politicians',
  })
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Politician)
  public async search(
    @Query() searchPoliticiansDto: SearchPoliticiansDto,
  ): Promise<PageDto<Politician>> {
    return this.politiciansService.searchElastic(searchPoliticiansDto);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Update politician by id',
  })
  update(@Param('id') id: string, @Body() politician: Politician) {
    return this.politiciansService.update(id, politician);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Delete politician by id',
  })
  public async deletePost(@Param('id') id: string) {
    return this.politiciansService.deletePolitician(id);
  }
}
