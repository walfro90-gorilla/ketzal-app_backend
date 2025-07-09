import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  // Find all services with review stats
  async findAllWithReviewStats() {
    const services = await this.prismaService.service.findMany();
    
    // Get review stats for each service
    const servicesWithStats = await Promise.all(
      services.map(async (service) => {
        const reviews = await this.prismaService.review.findMany({
          where: { serviceId: service.id },
          select: { rating: true }
        });
        
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
          : 0;
        
        return {
          ...service,
          rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
          reviewCount: totalReviews
        };
      })
    );
    
    return servicesWithStats;
  }

  // Find one service
  async findOne(id: number) {
    if (typeof id !== 'number' || isNaN(id)) {
      throw new NotFoundException('A valid service id must be provided');
    }
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
    // First verify the service exists
    await this.findOne(id);

    // Check for dependencies before deletion
    const dependencies = await this.checkServiceDependencies(id);
    if (dependencies.hasReviews) {
      throw new ConflictException(
        `Cannot delete service. It has ${dependencies.reviewsCount} review(s) associated. Please remove the reviews first.`
      );
    }

    // If we get here, it's safe to delete
    try {
      const deletedService = await this.prismaService.service.delete({
        where: { id }
      });
      console.log(`Service ${id} deleted successfully`);
      return deletedService;
    } catch (error) {
      console.error(`Error deleting service ${id}:`, error);
      throw new NotFoundException(`Service #${id} not found`);
    }
  }

  // Check dependencies for a service
  async checkServiceDependencies(id: number) {
    const reviews = await this.prismaService.review.findMany({
      where: { serviceId: id }
    });

    return {
      hasReviews: reviews.length > 0,
      reviewsCount: reviews.length,
      dependencies: [
        ...(reviews.length > 0 ? [`${reviews.length} review(s)`] : [])
      ]
    };
  }

  // Get service dependencies endpoint
  async getServiceDependencies(id: number) {
    await this.findOne(id); // Verify service exists
    return this.checkServiceDependencies(id);
  }
}
