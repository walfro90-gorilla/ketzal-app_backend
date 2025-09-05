"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const prisma_service_1 = require("../prisma/prisma.service");
const services_service_1 = require("./services.service");
const common_1 = require("@nestjs/common");
describe('ServicesService', () => {
    let service;
    let prisma;
    const mockService = {
        id: 1,
        name: 'Test Service',
        description: 'Test Description',
        price: 100,
        location: 'Test Location',
        supplierId: 1,
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
        const module = await testing_1.Test.createTestingModule({
            providers: [
                services_service_1.ServicesService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(services_service_1.ServicesService);
        prisma = module.get(prisma_service_1.PrismaService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a service', async () => {
            const createDto = mockService;
            prisma.service.create.mockResolvedValue(mockService);
            const result = await service.create(createDto);
            expect(result).toEqual(mockService);
            expect(prisma.service.create).toHaveBeenCalled();
        });
    });
    describe('findAll', () => {
        it('should return an array of services', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            const result = await service.findAll();
            expect(result).toEqual([mockService]);
        });
    });
    describe('findAllWithAverageRating', () => {
        it('should return services with average rating', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            prisma.review.findMany.mockResolvedValue([{ rating: 5 }, { rating: 3 }]);
            const result = await service.findAllWithAverageRating();
            expect(result[0]).toHaveProperty('averageRating', 4);
        });
        it('should handle services with no reviews', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            prisma.review.findMany.mockResolvedValue([]);
            const result = await service.findAllWithAverageRating();
            expect(result[0]).toHaveProperty('averageRating', 0);
        });
    });
    describe('findOne', () => {
        it('should return a single service', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            const result = await service.findOne(1);
            expect(result).toEqual(mockService);
        });
        it('should throw NotFoundException if service not found', async () => {
            prisma.service.findUnique.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('update', () => {
        it('should update a service', async () => {
            const updateDto = { name: 'Updated' };
            prisma.service.update.mockResolvedValue(Object.assign(Object.assign({}, mockService), updateDto));
            const result = await service.update(1, updateDto);
            expect(prisma.service.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateDto });
        });
        it('should throw NotFoundException if service to update is not found', async () => {
            prisma.service.update.mockResolvedValue(null);
            await expect(service.update(1, {})).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('remove', () => {
        it('should remove a service if it has no reviews', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            prisma.review.findMany.mockResolvedValue([]);
            prisma.service.delete.mockResolvedValue(mockService);
            const result = await service.remove(1);
            expect(result).toEqual(mockService);
            expect(prisma.service.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        it('should throw an error if service has reviews', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            prisma.review.findMany.mockResolvedValue([{ id: 1, rating: 5 }]);
            await expect(service.remove(1)).rejects.toThrow('Service has reviews and cannot be deleted');
        });
        it('should throw NotFoundException if service to remove is not found', async () => {
            prisma.service.findUnique.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('getReviews', () => {
        it('should return reviews for a service', async () => {
            prisma.review.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);
            const result = await service.getReviews(1);
            expect(result.length).toBe(2);
        });
    });
    describe('search', () => {
        it('should search services by keyword, location, and dates', async () => {
            const services = [mockService];
            prisma.service.findMany.mockResolvedValue(services);
            prisma.service.count.mockResolvedValue(1);
            const result = await service.search('Test', 'Location', new Date(), new Date(), 1, 10);
            expect(result.data).toEqual(services);
            expect(result.total).toBe(1);
        });
        it('should handle search with no results', async () => {
            const services = [];
            prisma.service.findMany.mockResolvedValue(services);
            prisma.service.count.mockResolvedValue(0);
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
            prisma.service.findUnique.mockResolvedValue(mockService);
            const result = await service.getServiceWithSupplier(1);
            expect(result).toEqual(mockService);
        });
    });
    describe('getServicesBySupplier', () => {
        it('should return services for a given supplier', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            const result = await service.getServicesBySupplier(1);
            expect(prisma.service.findMany).toHaveBeenCalledWith({ where: { supplierId: 1 } });
        });
    });
});
//# sourceMappingURL=services.service.spec.js.map