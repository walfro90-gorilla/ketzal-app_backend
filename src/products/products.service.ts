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
          images: createProductDto.images ? createProductDto.images as any : undefined,
          specifications: createProductDto.specifications ? createProductDto.specifications as any : undefined,
          tags: createProductDto.tags ? createProductDto.tags as any : undefined,
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
    return products.map((product: any) => this.parseProductJson(product));
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
    try {
      const updateData: any = { ...updateProductDto };
      
      // Handle JSON fields properly
      if (updateProductDto.images !== undefined) {
        updateData.images = updateProductDto.images ? updateProductDto.images as any : undefined;
      }
      if (updateProductDto.specifications !== undefined) {
        updateData.specifications = updateProductDto.specifications ? updateProductDto.specifications as any : undefined;
      }
      if (updateProductDto.tags !== undefined) {
        updateData.tags = updateProductDto.tags ? updateProductDto.tags as any : undefined;
      }

      return await this.prismaService.product.update({
        where: {
          id: id
        },
        data: updateData
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }

  // DELETE METHOD
  async remove(id: number) {
    try {
      return await this.prismaService.product.delete({
        where: {
          id: id
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      throw error;
    }
  }

  // FIND BY CATEGORY
  async findByCategory(category: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        category: category
      }
    });
    return products.map((product: any) => this.parseProductJson(product));
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
    return products.map((product: any) => this.parseProductJson(product));
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
