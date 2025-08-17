"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const services_service_1 = require("./services.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
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
    let service;
    let prisma;
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
            const createDto = { name: 'New Service', price: 150, supplierId: 1, categoryId: 1, description: '' };
            prisma.service.create.mockResolvedValue(mockService);
            const result = await service.create(createDto);
            expect(prisma.service.create).toHaveBeenCalledWith({ data: createDto });
            expect(result).toEqual(mockService);
        });
    });
    describe('findAll', () => {
        it('should return an array of services', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            const result = await service.findAll();
            expect(result).toEqual([mockService]);
        });
    });
    describe('findAllWithReviewStats', () => {
        it('should return services with review stats', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            prisma.review.findMany.mockResolvedValue([{ rating: 5 }, { rating: 3 }]);
            const result = await service.findAllWithReviewStats();
            expect(result[0].reviewCount).toBe(2);
            expect(result[0].rating).toBe(4);
        });
        it('should handle services with no reviews', async () => {
            prisma.service.findMany.mockResolvedValue([mockService]);
            prisma.review.findMany.mockResolvedValue([]);
            const result = await service.findAllWithReviewStats();
            expect(result[0].reviewCount).toBe(0);
            expect(result[0].rating).toBe(0);
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
            await expect(service.findOne(99)).rejects.toThrow(common_1.NotFoundException);
        });
        it('should throw NotFoundException for an invalid id', async () => {
            await expect(service.findOne(NaN)).rejects.toThrow(new common_1.NotFoundException('A valid service id must be provided'));
        });
    });
    describe('update', () => {
        it('should update a service', async () => {
            const updateDto = { name: 'Updated Service' };
            prisma.service.update.mockResolvedValue(Object.assign(Object.assign({}, mockService), updateDto));
            const result = await service.update(1, updateDto);
            expect(prisma.service.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateDto });
            expect(result.name).toEqual('Updated Service');
        });
        it('should throw NotFoundException if service to update is not found', async () => {
            prisma.service.update.mockResolvedValue(null);
            await expect(service.update(99, {})).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('remove', () => {
        it('should remove a service if it has no dependencies', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            prisma.review.findMany.mockResolvedValue([]);
            prisma.service.delete.mockResolvedValue(mockService);
            await service.remove(1);
            expect(prisma.service.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        it('should throw ConflictException if service has reviews', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            prisma.review.findMany.mockResolvedValue([{ id: 1, rating: 5 }]);
            await expect(service.remove(1)).rejects.toThrow(common_1.ConflictException);
        });
        it('should throw NotFoundException if service to remove is not found', async () => {
            prisma.service.findUnique.mockResolvedValue(null);
            await expect(service.remove(99)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('getServiceDependencies', () => {
        it('should return review count for a service', async () => {
            prisma.review.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);
            const result = await service.getServiceDependencies(1);
            expect(result.hasReviews).toBe(true);
            expect(result.reviewsCount).toBe(2);
        });
    });
    describe('findAllWithBusInfo', () => {
        it('should return paginated services with placeholder stats', async () => {
            const services = [mockService];
            prisma.service.findMany.mockResolvedValue(services);
            prisma.service.count.mockResolvedValue(1);
            const result = await service.findAllWithBusInfo({ page: 1, limit: 10 });
            expect(result.services).toEqual(services);
            expect(result.pagination.total).toBe(1);
            expect(result.stats.withTransport).toBe(0);
        });
        it('should filter services by a search term', async () => {
            const services = [mockService];
            prisma.service.findMany.mockResolvedValue(services);
            prisma.service.count.mockResolvedValue(1);
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
            prisma.service.findUnique.mockResolvedValue(mockService);
            const result = await service.getBusTransportConfig(1);
            expect(result.hasBusTransport).toBe(false);
            expect(result.message).toContain('temporarily disabled');
        });
    });
    describe('updateBusTransportConfig', () => {
        it('should return placeholder message for transport update', async () => {
            prisma.service.findUnique.mockResolvedValue(mockService);
            const result = await service.updateBusTransportConfig(1, {});
            expect(result.message).toContain('temporarily disabled');
        });
    });
});
//# sourceMappingURL=services.service.spec.js.map