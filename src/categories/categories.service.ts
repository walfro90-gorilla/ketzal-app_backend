import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.categories.create({ data: createCategoryDto });
  }

  findAll() {
    return this.prismaService.categories.findMany();
  }

  async findOne(id: number) {
    const category = await this.prismaService.categories.findUnique({ where: { id } });
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updated = await this.prismaService.categories.update({ where: { id }, data: updateCategoryDto });
    if (!updated) throw new NotFoundException(`Category #${id} not found`);
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prismaService.categories.delete({ where: { id } });
    if (!deleted) throw new NotFoundException(`Category #${id} not found`);
    return deleted;
  }
}