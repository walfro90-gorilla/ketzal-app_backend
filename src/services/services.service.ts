import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServicesService {

  // Inject PrismaService
  constructor(private prismaService: PrismaService) { }



  // Create a new service
  create(createServiceDto: CreateServiceDto) {
    return this.prismaService.service.create({ data: createServiceDto })
  }

  // Find all services
  findAll() {
    return this.prismaService.service.findMany()
  }

  // Find one service
  async findOne(id: number) {

    const serviceFound = await this.prismaService.service.findUnique({
      where: { id }
    })
    if (!serviceFound) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return serviceFound
  }

  // Update a service
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const updatedService = await this.prismaService.service.update({
      where: { id },
      data: updateServiceDto
    })
    if (!updatedService) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return updatedService
  }

  // Remove a service
  async remove(id: number) {
    const deletedService = await this.prismaService.service.delete({
      where: { id }
    })
    if (!deletedService) {
      throw new NotFoundException(`Service #${id} not found`);
    }
    return deletedService
  }
}
