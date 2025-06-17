import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GlobalLocationsService } from './global-locations.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('global_locations')
@Controller('global_locations')
export class GlobalLocationsController {
  constructor(private readonly globalLocationsService: GlobalLocationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a global location' })
  create(@Body() createDto: CreateGlobalLocationDto) {
    return this.globalLocationsService.create(createDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all global locations' })
  findAll() {
    return this.globalLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalLocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGlobalLocationDto) {
    return this.globalLocationsService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalLocationsService.remove(+id);
  }
}
