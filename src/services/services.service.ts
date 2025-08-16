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
      services.map(async (service: any) => {
        const reviews = await this.prismaService.review.findMany({
          where: { serviceId: service.id },
          select: { rating: true }
        });
        
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0 
          ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / totalReviews 
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

  // Check dependencies before service deletion
  private async checkServiceDependencies(serviceId: number) {
    const reviews = await this.prismaService.review.findMany({
      where: { serviceId },
      select: { id: true }
    });

    return {
      hasReviews: reviews.length > 0,
      reviewsCount: reviews.length
    };
  }

  // Public method to get service dependencies (used by controller)
  async getServiceDependencies(serviceId: number) {
    return this.checkServiceDependencies(serviceId);
  }

  // Find all services with bus info (temporarily simplified)
  async findAllWithBusInfo(filters: {
    page: number;
    limit: number;
    search?: string;
    hasTransport?: boolean;
  }) {
    const { page, limit, search } = filters;
    const skip = (page - 1) * limit;

    // Construir filtros
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Transport filtering temporarily disabled until schema is updated
    // if (hasTransport !== undefined) {
    //   where.hasBusTransport = hasTransport;
    // }

    // Obtener servicios con paginación
    const [services, total] = await Promise.all([
      this.prismaService.service.findMany({
        where,
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prismaService.service.count({ where })
    ]);

    // Temporary stats without transport functionality
    const statsFormatted = {
      total,
      withTransport: 0, // Temporarily disabled
      withoutTransport: total, // All services considered without transport for now
    };

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      stats: statsFormatted
    };
  }

  // Temporary placeholder methods for transport functionality
  async getBusTransportConfig(id: number) {
    const service = await this.prismaService.service.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
      }
    });

    return {
      ...service,
      hasBusTransport: false, // Temporarily hardcoded
      busLayout: null,
      seatPricing: null,
      message: 'Transport configuration temporarily disabled'
    };
  }

  // Temporary placeholder for transport config updates
  async updateBusTransportConfig(id: number, updateData: any) {
    // Just return the service without transport updates for now
    const service = await this.findOne(id);
    return {
      ...service,
      message: 'Transport configuration update temporarily disabled'
    };
  }
}
