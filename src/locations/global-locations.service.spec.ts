import { Test, TestingModule } from '@nestjs/testing';
import { GlobalLocationsService } from './global-locations.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaMock = {
  global_locations: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('GlobalLocationsService', () => {
  let service: GlobalLocationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalLocationsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<GlobalLocationsService>(GlobalLocationsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a location successfully', async () => {
      const createDto = { country: 'Test Country', state: 'Test State', city: 'Test City' };
      const expectedLocation = { id: 1, ...createDto };
      prismaMock.global_locations.create.mockResolvedValue(expectedLocation);

      const result = await service.create(createDto);
      expect(result).toEqual(expectedLocation);
      expect(prismaMock.global_locations.create).toHaveBeenCalledWith({ data: createDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const locations = [{ id: 1, name: 'Test Location' }];
      prismaMock.global_locations.findMany.mockResolvedValue(locations);

      const result = await service.findAll();
      expect(result).toEqual(locations);
      expect(prismaMock.global_locations.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a location if found', async () => {
      const location = { id: 1, name: 'Test Location' };
      prismaMock.global_locations.findUnique.mockResolvedValue(location);

      const result = await service.findOne(1);
      expect(result).toEqual(location);
      expect(prismaMock.global_locations.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if location not found', async () => {
      prismaMock.global_locations.findUnique.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(new NotFoundException('Location #1 not found'));
    });
  });

  describe('update', () => {
    const locationId = 1;
    const updateDto = { city: 'Updated City' };
    const updatedLocation = { id: locationId, city: 'Updated City' };

    it('should update a location successfully', async () => {
      prismaMock.global_locations.update.mockResolvedValue(updatedLocation);

      const result = await service.update(locationId, updateDto);
      expect(result).toEqual(updatedLocation);
      expect(prismaMock.global_locations.update).toHaveBeenCalledWith({
        where: { id: locationId },
        data: updateDto,
      });
    });

    it('should throw a NotFoundException if location to update is not found', async () => {
        prismaMock.global_locations.update.mockResolvedValue(null);
        await expect(service.update(locationId, updateDto)).rejects.toThrow(new NotFoundException(`Location #${locationId} not found`));
      });
  });

  describe('remove', () => {
    it('should remove a location successfully', async () => {
      const location = { id: 1 };
      prismaMock.global_locations.delete.mockResolvedValue(location);

      const result = await service.remove(1);
      expect(result).toEqual(location);
      expect(prismaMock.global_locations.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a NotFoundException if location to remove is not found', async () => {
        prismaMock.global_locations.delete.mockResolvedValue(null);
        await expect(service.remove(1)).rejects.toThrow(new NotFoundException('Location #1 not found'));
    });
  });
});