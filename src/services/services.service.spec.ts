import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: PrismaService;

  const mockService = {
    id: 1,
    name: 'Test Service',
    description: 'Test Description',
    price: 100,
    location: 'Test Location',
    supplierId: 1,
    // ... other fields
  };

  const mockPrismaService = {
    services: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    reviews: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a service', async () => {
      const createDto: CreateServiceDto = mockService as any;
      (prisma.service.create as jest.Mock).mockResolvedValue(mockService);

      const result = await service.create(createDto);
      expect(result).toEqual(mockService);
      expect(prisma.service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
      const result = await service.findAll();
      expect(result).toEqual([mockService]);
    });
  });

  describe('findAllWithAverageRating', () => {
    it('should return services with average rating', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
      (prisma.review.findMany as jest.Mock).mockResolvedValue([{ rating: 5 }, { rating: 3 }]);

      const result = await service.findAllWithAverageRating();
      expect(result[0]).toHaveProperty('averageRating', 4);
    });

    it('should handle services with no reviews', async () => {
        (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
        (prisma.review.findMany as jest.Mock).mockResolvedValue([]);
  
        const result = await service.findAllWithAverageRating();
        expect(result[0]).toHaveProperty('averageRating', 0);
      });
  });

  describe('findOne', () => {
    it('should return a single service', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
      const result = await service.findOne(1);
      expect(result).toEqual(mockService);
    });

    it('should throw NotFoundException if service not found', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const updateDto: UpdateServiceDto = { name: 'Updated' };
      (prisma.service.update as jest.Mock).mockResolvedValue({ ...mockService, ...updateDto });

      const result = await service.update(1, updateDto);
      expect(prisma.service.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateDto });
    });

    it('should throw NotFoundException if service to update is not found', async () => {
        (prisma.service.update as jest.Mock).mockResolvedValue(null);
        await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
      });
  });

  describe('remove', () => {
    it('should remove a service if it has no reviews', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService); // For the findOne check
      (prisma.review.findMany as jest.Mock).mockResolvedValue([]); // No reviews
      (prisma.service.delete as jest.Mock).mockResolvedValue(mockService);

      const result = await service.remove(1);
      expect(result).toEqual(mockService);
      expect(prisma.service.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw an error if service has reviews', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
      (prisma.review.findMany as jest.Mock).mockResolvedValue([{ id: 1, rating: 5 }]);

      await expect(service.remove(1)).rejects.toThrow('Service has reviews and cannot be deleted');
    });

    it('should throw NotFoundException if service to remove is not found', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getReviews', () => {
    it('should return reviews for a service', async () => {
        (prisma.review.findMany as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const result = await service.getReviews(1);
        expect(result.length).toBe(2);
      });
  });

  describe('search', () => {
    it('should search services by keyword, location, and dates', async () => {
        const services = [mockService];
        (prisma.service.findMany as jest.Mock).mockResolvedValue(services);
        (prisma.service.count as jest.Mock).mockResolvedValue(1);

        const result = await service.search('Test', 'Location', new Date(), new Date(), 1, 10);
        expect(result.data).toEqual(services);
        expect(result.total).toBe(1);
      });

    it('should handle search with no results', async () => {
        const services: any[] = [];
        (prisma.service.findMany as jest.Mock).mockResolvedValue(services);
        (prisma.service.count as jest.Mock).mockResolvedValue(0);

        const result = await service.search('Test', 'Location', new Date(), new Date(), 1, 10);
        expect(prisma.service.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: expect.any(Object)
        }));
        expect(result.data.length).toBe(0);
        expect(result.total).toBe(0);
      });
  });

  describe('getServiceWithSupplier', () => {
    it('should return a service with its supplier', async () => {
        (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
        const result = await service.getServiceWithSupplier(1);
        expect(result).toEqual(mockService);
      });
  });

  describe('getServicesBySupplier', () => {
    it('should return services for a given supplier', async () => {
        (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
        const result = await service.getServicesBySupplier(1);
        expect(prisma.service.findMany).toHaveBeenCalledWith({ where: { supplierId: 1 } });
      });
  });
});
