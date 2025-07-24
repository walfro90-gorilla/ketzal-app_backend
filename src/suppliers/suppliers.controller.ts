

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierApprovalDto } from './dto/supplier-approval.dto';


@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}


  @Get('stats')
  async getStats() {
    return this.suppliersService.getSupplierStats();
  }

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }
  @Get()
  findAll(@Query('pending') pending?: string) {
    return this.suppliersService.findAll(pending);
  }

  @Get('check-duplicate')
  checkDuplicate(
    @Query('name') name?: string, 
    @Query('email') email?: string,
    @Query('excludeId') excludeId?: string
  ) {
    return this.suppliersService.checkDuplicate(name, email, excludeId ? +excludeId : undefined);
  }

  @Get('search')
  search(@Query('name') name?: string, @Query('email') email?: string) {
    return this.suppliersService.search(name, email);
  }

  @Get(':id/dependencies')
  checkDependencies(@Param('id') id: string) {
    return this.suppliersService.checkDependencies(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Patch(':id/approval')
  async approveOrDeclineSupplier(
    @Param('id') id: string,
    @Body() approvalDto: SupplierApprovalDto,
  ) {
    return this.suppliersService.approveOrDeclineSupplier(+id, approvalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(+id);
  }
}
