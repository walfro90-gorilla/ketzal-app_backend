"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const planners_service_1 = require("./planners.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
describe('PlannersService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        travelPlanner: {
            create: jest.fn(),
            findMany: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
        plannerItem: {
            create: jest.fn(),
            findFirst: jest.fn(),
            delete: jest.fn(),
            findMany: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                planners_service_1.PlannersService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(planners_service_1.PlannersService);
        prisma = module.get(prisma_service_1.PrismaService);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('createPlanner', () => {
        it('should create a planner', async () => {
            const dto = { name: 'Test Planner', destination: 'Test Destination' };
            const planner = Object.assign(Object.assign({ id: '1' }, dto), { items: [], user: { id: '1', name: 'test', email: 'test@test.com' } });
            mockPrismaService.travelPlanner.create.mockResolvedValue(planner);
            const result = await service.createPlanner('1', dto);
            expect(result).toEqual(planner);
        });
    });
    describe('getPlannersByUser', () => {
        it('should return planners for a user', async () => {
            const planners = [{ id: '1', name: 'Test Planner' }];
            mockPrismaService.travelPlanner.findMany.mockResolvedValue(planners);
            const result = await service.getPlannersByUser('1');
            expect(result).toEqual(planners);
        });
    });
    describe('getPlannerById', () => {
        it('should return a planner', async () => {
            const planner = { id: '1', name: 'Test Planner' };
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(planner);
            const result = await service.getPlannerById('1', '1');
            expect(result).toEqual(planner);
        });
        it('should throw not found exception', async () => {
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(null);
            await expect(service.getPlannerById('1', '1')).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('updatePlanner', () => {
        it('should update a planner', async () => {
            const dto = { name: 'Test Planner' };
            const planner = { id: '1', name: 'Test Planner' };
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(planner);
            mockPrismaService.travelPlanner.update.mockResolvedValue(planner);
            const result = await service.updatePlanner('1', '1', dto);
            expect(result).toEqual(planner);
        });
    });
    describe('deletePlanner', () => {
        it('should delete a planner', async () => {
            const planner = { id: '1', name: 'Test Planner' };
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(planner);
            mockPrismaService.travelPlanner.delete.mockResolvedValue(planner);
            const result = await service.deletePlanner('1', '1');
            expect(result).toEqual({ message: 'Planner deleted successfully' });
        });
    });
    describe('addItemToPlanner', () => {
        it('should add an item to a planner', async () => {
            const dto = { plannerId: '1', serviceId: 1, quantity: 1, priceMXN: 100 };
            const planner = { id: '1', name: 'Test Planner' };
            const item = Object.assign({ id: '1' }, dto);
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(planner);
            mockPrismaService.plannerItem.create.mockResolvedValue(item);
            mockPrismaService.plannerItem.findMany.mockResolvedValue([item]);
            mockPrismaService.travelPlanner.update.mockResolvedValue(planner);
            const result = await service.addItemToPlanner(dto, '1');
            expect(result).toEqual(item);
        });
    });
    describe('removeItemFromPlanner', () => {
        it('should remove an item from a planner', async () => {
            const item = { id: '1', plannerId: '1' };
            mockPrismaService.plannerItem.findFirst.mockResolvedValue(item);
            mockPrismaService.plannerItem.delete.mockResolvedValue(item);
            mockPrismaService.plannerItem.findMany.mockResolvedValue([]);
            mockPrismaService.travelPlanner.update.mockResolvedValue({ id: '1' });
            const result = await service.removeItemFromPlanner('1', '1');
            expect(result).toEqual({ message: 'Item removed successfully' });
        });
    });
    describe('getPlannerStats', () => {
        it('should return planner stats', async () => {
            const planner = { id: '1', name: 'Test Planner', totalMXN: 100, totalAxo: 10, items: [] };
            mockPrismaService.travelPlanner.findFirst.mockResolvedValue(planner);
            const result = await service.getPlannerStats('1', '1');
            expect(result).toBeDefined();
        });
    });
});
//# sourceMappingURL=planners.service.spec.js.map