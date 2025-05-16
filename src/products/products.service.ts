import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) { }


  // CREATE METHOD 
  async create(createProductDto: CreateProductDto) {
    try {

      return await this.prismaService.product.create({
        data: createProductDto
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`)
        }
      }
    }
  }

  // READ ALL METHOD
  findAll() {
    return this.prismaService.product.findMany()
  }

  // READ ONE METHOD
  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: {
        id: id
      }
    })
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productFound
  }

  // UPDATE METHOD
  async update(id: number, updateProductDto: UpdateProductDto) {
    const productFound = await this.prismaService.product.update({
      where: {
        id: id
      },
      data: updateProductDto
    })
    if (!productFound) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return productFound;
  }

  // DELETE METHOD
  async remove(id: number) {
    const deleteProduct = await this.prismaService.product.delete({
      where: {
        id: id
      }
    })
    if (!deleteProduct) {
      throw new NotFoundException(`Product with id ${id} not found`)
    }
    return deleteProduct
  }
}
