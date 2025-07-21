import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) { }


  // CREATE METHOD 
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          priceAxo: createProductDto.priceAxo,
          stock: createProductDto.stock,
          image: createProductDto.image ?? '',
          category: createProductDto.category,
          images: createProductDto.images ? createProductDto.images as Prisma.InputJsonValue : undefined,
          specifications: createProductDto.specifications ? createProductDto.specifications as Prisma.InputJsonValue : undefined,
          tags: createProductDto.tags ? createProductDto.tags as Prisma.InputJsonValue : undefined,
        }
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        const prismaError = error as PrismaClientKnownRequestError;
        if (prismaError.code === 'P2002') {
          throw new ConflictException(`Product with name ${createProductDto.name} already exists`)
        }
      }
    }
  }

  // READ ALL METHOD
  async findAll() {
    const products = await this.prismaService.product.findMany();
    return products.map(product => this.parseProductJson(product));
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
    return this.parseProductJson(productFound);
  }

  // UPDATE METHOD
  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateData: any = { ...updateProductDto };
    
    // Handle JSON fields properly
    if (updateProductDto.images !== undefined) {
      updateData.images = updateProductDto.images ? updateProductDto.images as Prisma.InputJsonValue : undefined;
    }
    if (updateProductDto.specifications !== undefined) {
      updateData.specifications = updateProductDto.specifications ? updateProductDto.specifications as Prisma.InputJsonValue : undefined;
    }
    if (updateProductDto.tags !== undefined) {
      updateData.tags = updateProductDto.tags ? updateProductDto.tags as Prisma.InputJsonValue : undefined;
    }

    const productFound = await this.prismaService.product.update({
      where: {
        id: id
      },
      data: updateData
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

  // FIND BY CATEGORY
  async findByCategory(category: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        category: category
      }
    });
    return products.map(product => this.parseProductJson(product));
  }

  // SEARCH PRODUCTS
  async searchProducts(query: string, category?: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } }
            ]
          },
          category ? { category: category } : {}
        ]
      }
    });
    return products.map(product => this.parseProductJson(product));
  }

  // Helper method to parse JSON fields
  private parseProductJson(product: any) {
    return {
      ...product,
      images: product.images ? JSON.parse(product.images) : [],
      specifications: product.specifications ? JSON.parse(product.specifications) : {},
      tags: product.tags ? JSON.parse(product.tags) : []
    };
  }
}
