import { Test, TestingModule } from '@nestjs/testing';
import { PlannersService } from './planners.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannerDto, PlannerStatusDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PlannersService', () => {
  let service: PlannersService;
  let prisma: PrismaService;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlannersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PlannersService>(PlannersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPlanner', () => {
    it('should create a planner', async () => {
      const dto: CreatePlannerDto = { name: 'Test Planner', destination: 'Test Destination' };
      const planner = { id: '1', ...dto, items: [], user: {id: '1', name: 'test', email: 'test@test.com'} };
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
      await expect(service.getPlannerById('1', '1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePlanner', () => {
    it('should update a planner', async () => {
      const dto: UpdatePlannerDto = { name: 'Test Planner' };
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
      const dto: AddItemToPlannerDto = { plannerId: '1', serviceId: 1, quantity: 1, priceMXN: 100 };
      const planner = { id: '1', name: 'Test Planner' };
      const item = { id: '1', ...dto };
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