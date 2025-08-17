"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const categories_service_1 = require("./categories.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const prismaMock = {
    categories: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};
describe('CategoriesService', () => {
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                categories_service_1.CategoriesService,
                { provide: prisma_service_1.PrismaService, useValue: prismaMock },
            ],
        }).compile();
        service = module.get(categories_service_1.CategoriesService);
        prisma = module.get(prisma_service_1.PrismaService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a category successfully', async () => {
            const createDto = { name: 'Test Category', description: 'Test Description' };
            const expectedCategory = Object.assign({ id: 1 }, createDto);
            prismaMock.categories.create.mockResolvedValue(expectedCategory);
            const result = await service.create(createDto);
            expect(result).toEqual(expectedCategory);
            expect(prismaMock.categories.create).toHaveBeenCalledWith({ data: createDto });
        });
    });
    describe('findAll', () => {
        it('should return an array of categories', async () => {
            const categories = [{ id: 1, name: 'Test Category' }];
            prismaMock.categories.findMany.mockResolvedValue(categories);
            const result = await service.findAll();
            expect(result).toEqual(categories);
            expect(prismaMock.categories.findMany).toHaveBeenCalledWith();
        });
    });
    describe('findOne', () => {
        it('should return a category if found', async () => {
            const category = { id: 1, name: 'Test Category' };
            prismaMock.categories.findUnique.mockResolvedValue(category);
            const result = await service.findOne(1);
            expect(result).toEqual(category);
            expect(prismaMock.categories.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        it('should throw a NotFoundException if category not found', async () => {
            prismaMock.categories.findUnique.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow(new common_1.NotFoundException('Category #1 not found'));
        });
    });
    describe('update', () => {
        const categoryId = 1;
        const updateDto = { name: 'Updated Name' };
        const updatedCategory = { id: categoryId, name: 'Updated Name' };
        it('should update a category successfully', async () => {
            prismaMock.categories.update.mockResolvedValue(updatedCategory);
            const result = await service.update(categoryId, updateDto);
            expect(result).toEqual(updatedCategory);
            expect(prismaMock.categories.update).toHaveBeenCalledWith({
                where: { id: categoryId },
                data: updateDto,
            });
        });
        it('should throw a NotFoundException if category to update is not found', async () => {
            prismaMock.categories.update.mockResolvedValue(null);
            await expect(service.update(categoryId, updateDto)).rejects.toThrow(new common_1.NotFoundException(`Category #${categoryId} not found`));
        });
    });
    describe('remove', () => {
        it('should remove a category successfully', async () => {
            const category = { id: 1 };
            prismaMock.categories.delete.mockResolvedValue(category);
            const result = await service.remove(1);
            expect(result).toEqual(category);
            expect(prismaMock.categories.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        });
        it('should throw a NotFoundException if category to remove is not found', async () => {
            prismaMock.categories.delete.mockResolvedValue(null);
            await expect(service.remove(1)).rejects.toThrow(new common_1.NotFoundException('Category #1 not found'));
        });
    });
});
//# sourceMappingURL=categories.service.spec.js.map