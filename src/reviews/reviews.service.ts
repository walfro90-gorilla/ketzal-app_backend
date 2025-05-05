import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prismaService: PrismaService) {}

  // Crear review
  create(createReviewDto: CreateReviewDto) {
    return this.prismaService.review.create({ data: createReviewDto });
  }

  // Obtener todas las reviews
  findAll() {
    return this.prismaService.review.findMany();
  }

  // Obtener una review por id
  async findOne(id: number) {
    const review = await this.prismaService.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  // Actualizar una review
  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const updated = await this.prismaService.review.update({ where: { id }, data: updateReviewDto });
    if (!updated) throw new NotFoundException(`Review #${id} not found`);
    return updated;
  }

  // Eliminar una review
  async remove(id: number) {
    const deleted = await this.prismaService.review.delete({ where: { id } });
    if (!deleted) throw new NotFoundException(`Review #${id} not found`);
    return deleted;
  }

  // Obtener reviews por servicio (ya existente)
  getReviewsByService(serviceId: number) {
    return this.prismaService.review.findMany({ where: { serviceId } });
  }

  // Crear review para un servicio y usuario (ya existente)
  createReview(serviceId: number, userId: string, rating: number, comment: string) {
    return this.prismaService.review.create({
      data: { serviceId, userId, rating, comment },
    });
  }
}
