import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';

@Injectable()
export class GlobalLocationsService {
  constructor(private prisma: PrismaService) {}

  create(createDto: CreateGlobalLocationDto) {
    return this.prisma.global_locations.create({ data: createDto });
  }

  findAll() {
    return this.prisma.global_locations.findMany();
  }

  async findOne(id: number) {
    const location = await this.prisma.global_locations.findUnique({ where: { id } });
    if (!location) throw new NotFoundException(`Location #${id} not found`);
    return location;
  }

  async update(id: number, updateDto: UpdateGlobalLocationDto) {
    const updated = await this.prisma.global_locations.update({ where: { id }, data: updateDto });
    if (!updated) throw new NotFoundException(`Location #${id} not found`);
    return updated;
  }

  async remove(id: number) {
    const deleted = await this.prisma.global_locations.delete({ where: { id } });
    if (!deleted) throw new NotFoundException(`Location #${id} not found`);
    return deleted;
  }
}
