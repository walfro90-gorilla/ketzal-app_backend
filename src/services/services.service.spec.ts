import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  service: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  review: {
    findMany: jest.fn(),
  },
};

const mockService = {
  id: 1,
  name: 'Test Service',
  description: 'A service for testing',
  price: 100,
  supplierId: 1,
  categoryId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ServicesService', () => {
  let service: ServicesService;
  let prisma: PrismaService;

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
      const createDto = { name: 'New Service', price: 150, supplierId: 1, categoryId: 1, description: '' };
      (prisma.service.create as jest.Mock).mockResolvedValue(mockService);

      const result = await service.create(createDto);

      expect(prisma.service.create).toHaveBeenCalledWith({ data: createDto });
      expect(result).toEqual(mockService);
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
      const result = await service.findAll();
      expect(result).toEqual([mockService]);
    });
  });

  describe('findAllWithReviewStats', () => {
    it('should return services with review stats', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
      (prisma.review.findMany as jest.Mock).mockResolvedValue([{ rating: 5 }, { rating: 3 }]);

      const result = await service.findAllWithReviewStats();

      expect(result[0].reviewCount).toBe(2);
      expect(result[0].rating).toBe(4);
    });

    it('should handle services with no reviews', async () => {
        (prisma.service.findMany as jest.Mock).mockResolvedValue([mockService]);
        (prisma.review.findMany as jest.Mock).mockResolvedValue([]);
  
        const result = await service.findAllWithReviewStats();
  
        expect(result[0].reviewCount).toBe(0);
        expect(result[0].rating).toBe(0);
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
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException for an invalid id', async () => {
        await expect(service.findOne(NaN)).rejects.toThrow(new NotFoundException('A valid service id must be provided'));
      });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const updateDto = { name: 'Updated Service' };
      (prisma.service.update as jest.Mock).mockResolvedValue({ ...mockService, ...updateDto });

      const result = await service.update(1, updateDto);

      expect(prisma.service.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateDto });
      expect(result.name).toEqual('Updated Service');
    });

    it('should throw NotFoundException if service to update is not found', async () => {
        (prisma.service.update as jest.Mock).mockResolvedValue(null);
        await expect(service.update(99, {})).rejects.toThrow(NotFoundException);
      });
  });

  describe('remove', () => {
    it('should remove a service if it has no dependencies', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService); // For the findOne check
      (prisma.review.findMany as jest.Mock).mockResolvedValue([]); // No reviews
      (prisma.service.delete as jest.Mock).mockResolvedValue(mockService);

      await service.remove(1);

      expect(prisma.service.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw ConflictException if service has reviews', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
      (prisma.review.findMany as jest.Mock).mockResolvedValue([{ id: 1, rating: 5 }]);

      await expect(service.remove(1)).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if service to remove is not found', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getServiceDependencies', () => {
    it('should return review count for a service', async () => {
        (prisma.review.findMany as jest.Mock).mockResolvedValue([{ id: 1 }, { id: 2 }]);
        const result = await service.getServiceDependencies(1);
        expect(result.hasReviews).toBe(true);
        expect(result.reviewsCount).toBe(2);
    });
  });

  describe('findAllWithBusInfo', () => {
    it('should return paginated services with placeholder stats', async () => {
        const services = [mockService];
        (prisma.service.findMany as jest.Mock).mockResolvedValue(services);
        (prisma.service.count as jest.Mock).mockResolvedValue(1);

        const result = await service.findAllWithBusInfo({ page: 1, limit: 10 });

        expect(result.services).toEqual(services);
        expect(result.pagination.total).toBe(1);
        expect(result.stats.withTransport).toBe(0);
    });

    it('should filter services by a search term', async () => {
        const services = [mockService];
        (prisma.service.findMany as jest.Mock).mockResolvedValue(services);
        (prisma.service.count as jest.Mock).mockResolvedValue(1);

        await service.findAllWithBusInfo({ page: 1, limit: 10, search: 'Test' });

        expect(prisma.service.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: {
                OR: [
                    { name: { contains: 'Test', mode: 'insensitive' } },
                    { description: { contains: 'Test', mode: 'insensitive' } },
                ]
            }
        }));
    });
  });

  describe('getBusTransportConfig', () => {
    it('should return placeholder transport config', async () => {
        (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
        const result = await service.getBusTransportConfig(1);
        expect(result.hasBusTransport).toBe(false);
        expect(result.message).toContain('temporarily disabled');
    });
  });

  describe('updateBusTransportConfig', () => {
    it('should return placeholder message for transport update', async () => {
        (prisma.service.findUnique as jest.Mock).mockResolvedValue(mockService);
        const result = await service.updateBusTransportConfig(1, {});
        expect(result.message).toContain('temporarily disabled');
    });
  });
});
