"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const global_locations_service_1 = require("./global-locations.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
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
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                global_locations_service_1.GlobalLocationsService,
                { provide: prisma_service_1.PrismaService, useValue: prismaMock },
            ],
        }).compile();
        service = module.get(global_locations_service_1.GlobalLocationsService);
        prisma = module.get(prisma_service_1.PrismaService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a location successfully', async () => {
            const createDto = { country: 'Test Country', state: 'Test State', city: 'Test City' };
            const expectedLocation = Object.assign({ id: 1 }, createDto);
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
            await expect(service.findOne(1)).rejects.toThrow(new common_1.NotFoundException('Location #1 not found'));
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
            await expect(service.update(locationId, updateDto)).rejects.toThrow(new common_1.NotFoundException(`Location #${locationId} not found`));
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
            await expect(service.remove(1)).rejects.toThrow(new common_1.NotFoundException('Location #1 not found'));
        });
    });
});
//# sourceMappingURL=global-locations.service.spec.js.map