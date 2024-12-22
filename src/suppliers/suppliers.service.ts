import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SuppliersService {

  // inject PrismaService
  constructor(private prismaService: PrismaService) { }


  // Create method
  async create(createSupplierDto: CreateSupplierDto) {
    try {
      return await this.prismaService.supplier.create({
        data: createSupplierDto
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException (`Supplier with name ${createSupplierDto.name} already exists`)
        }
      }
    }
  }

  // Find all method
  findAll() {
    return this.prismaService.supplier.findMany()
  }

  // Find one method
  async findOne(id: number) {
    const supplierFound = await this.prismaService.supplier.findUnique({
      where: {
        id: id
      }
    })
    if (!supplierFound) {
      throw new Error(`Supplier with id ${id} not found`)
    }
    return supplierFound
  }

  // Update method
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const productFound = await this.prismaService.supplier.update({
      where: {
        id: id
      },
      data: updateSupplierDto
    })
    if (!productFound) {
      throw new Error(`Supplier with id ${id} not found`)
    }
    return productFound
  }

  // Remove method
  async remove(id: number) {
    const deletedSupplier = await this.prismaService.supplier.delete({
      where: {
        id: id
      }
    })
    if (!deletedSupplier) {
      throw new Error(`Supplier with id ${id} not found`)
    }
    return deletedSupplier
  }
}
