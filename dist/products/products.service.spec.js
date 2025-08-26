"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const products_service_1 = require("./products.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'A great product',
    price: 100,
    priceAxo: 120,
    stock: 10,
    image: 'image.jpg',
    category: 'Test',
    images: '[]',
    specifications: '{}',
    tags: '[]',
    createdAt: new Date(),
    updatedAt: new Date(),
    supplierId: null,
};
const mockPrismaService = {
    products: {
        create: jest.fn().mockResolvedValue(mockProduct),
        findMany: jest.fn().mockResolvedValue([mockProduct]),
        findUnique: jest.fn().mockResolvedValue(mockProduct),
        update: jest.fn().mockResolvedValue(mockProduct),
        delete: jest.fn().mockResolvedValue(mockProduct),
    },
};
describe('ProductsService', () => {
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                products_service_1.ProductsService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(products_service_1.ProductsService);
        prisma = module.get(prisma_service_1.PrismaService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a product successfully', async () => {
            const createProductDto = {
                name: 'Test Product',
                description: 'A great product',
                price: 100,
                priceAxo: 120,
                stock: 10,
                image: 'image.jpg',
                category: 'Test',
                images: [],
                specifications: {},
                tags: [],
            };
            const result = await service.create(createProductDto);
            expect(prisma.products.create).toHaveBeenCalledWith({
                data: Object.assign(Object.assign({}, createProductDto), { image: 'image.jpg', images: [], specifications: {}, tags: [] }),
            });
            expect(result).toEqual(mockProduct);
        });
        it('should throw a ConflictException if the product name already exists', async () => {
            const createProductDto = {
                name: 'Test Product',
                description: 'A great product',
                price: 100,
                priceAxo: 120,
                stock: 10,
                image: 'image.jpg',
                category: 'Test',
                images: [],
                specifications: {},
                tags: [],
            };
            const prismaError = new client_1.Prisma.PrismaClientKnownRequestError('Product with this name already exists', { code: 'P2002', clientVersion: 'mock' });
            prisma.products.create.mockRejectedValue(prismaError);
            await expect(service.create(createProductDto)).rejects.toThrow(new common_1.ConflictException(`Product with name ${createProductDto.name} already exists`));
        });
    });
    describe('findAll', () => {
        it('should return an array of products', async () => {
            const mockProducts = [
                Object.assign(Object.assign({}, mockProduct), { id: 1, name: 'Product 1' }),
                Object.assign(Object.assign({}, mockProduct), { id: 2, name: 'Product 2', images: '["img1.jpg"]', specifications: '{"key":"value"}', tags: '["tag1"]' }),
            ];
            prisma.products.findMany.mockResolvedValue(mockProducts);
            const result = await service.findAll();
            expect(prisma.products.findMany).toHaveBeenCalled();
            expect(result).toEqual([
                Object.assign(Object.assign({}, mockProduct), { id: 1, name: 'Product 1', images: [], specifications: {}, tags: [] }),
                Object.assign(Object.assign({}, mockProduct), { id: 2, name: 'Product 2', images: ['img1.jpg'], specifications: { key: 'value' }, tags: ['tag1'] }),
            ]);
        });
    });
    describe('findOne', () => {
        it('should return a single product', async () => {
            prisma.products.findUnique.mockResolvedValue(mockProduct);
            const result = await service.findOne(1);
            expect(prisma.products.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(Object.assign(Object.assign({}, mockProduct), { images: [], specifications: {}, tags: [] }));
        });
        it('should throw a NotFoundException if product is not found', async () => {
            prisma.products.findUnique.mockResolvedValue(null);
            await expect(service.findOne(99)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('update', () => {
        it('should update a product successfully', async () => {
            const updateDto = { name: 'Updated Name' };
            const updatedProduct = Object.assign(Object.assign({}, mockProduct), updateDto);
            prisma.products.update.mockResolvedValue(updatedProduct);
            const result = await service.update(1, updateDto);
            expect(prisma.products.update).toHaveBeenCalledWith({
                where: { id: 1 },
                data: updateDto,
            });
            expect(result).toEqual(updatedProduct);
        });
        it('should throw a NotFoundException if product to update is not found', async () => {
            const updateDto = { name: 'Updated Name' };
            const error = new client_1.Prisma.PrismaClientKnownRequestError('Product not found', {
                code: 'P2025',
                clientVersion: 'mock'
            });
            prisma.products.update.mockRejectedValue(error);
            await expect(service.update(99, updateDto)).rejects.toThrow(new common_1.NotFoundException('Product with id 99 not found'));
        });
    });
    describe('remove', () => {
        it('should delete a product successfully', async () => {
            prisma.products.delete.mockResolvedValue(mockProduct);
            const result = await service.remove(1);
            expect(prisma.products.delete).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockProduct);
        });
        it('should throw a NotFoundException if product to remove is not found', async () => {
            const error = new client_1.Prisma.PrismaClientKnownRequestError('Product not found', {
                code: 'P2025',
                clientVersion: 'mock'
            });
            prisma.products.delete.mockRejectedValue(error);
            await expect(service.remove(99)).rejects.toThrow(new common_1.NotFoundException('Product with id 99 not found'));
        });
    });
    describe('findByCategory', () => {
        it('should return products for a given category', async () => {
            const category = 'Test';
            const mockProducts = [Object.assign(Object.assign({}, mockProduct), { category: category })];
            prisma.products.findMany.mockResolvedValue(mockProducts);
            const result = await service.findByCategory(category);
            expect(prisma.products.findMany).toHaveBeenCalledWith({ where: { category: category } });
            expect(result).toEqual([Object.assign(Object.assign({}, mockProduct), { category: category, images: [], specifications: {}, tags: [] })]);
        });
    });
    describe('searchProducts', () => {
        it('should return products matching the query', async () => {
            const query = 'Test';
            prisma.products.findMany.mockResolvedValue([mockProduct]);
            const result = await service.searchProducts(query);
            expect(prisma.products.findMany).toHaveBeenCalledWith({
                where: {
                    AND: [
                        {
                            OR: [{ name: { contains: query } }, { description: { contains: query } }],
                        },
                        {},
                    ],
                },
            });
            expect(result).toEqual([Object.assign(Object.assign({}, mockProduct), { images: [], specifications: {}, tags: [] })]);
        });
        it('should return products matching the query and category', async () => {
            const query = 'Test';
            const category = 'TestCategory';
            prisma.products.findMany.mockResolvedValue([mockProduct]);
            const result = await service.searchProducts(query, category);
            expect(prisma.products.findMany).toHaveBeenCalledWith({
                where: {
                    AND: [
                        {
                            OR: [{ name: { contains: query } }, { description: { contains: query } }],
                        },
                        { category: category },
                    ],
                },
            });
            expect(result).toEqual([Object.assign(Object.assign({}, mockProduct), { images: [], specifications: {}, tags: [] })]);
        });
    });
});
//# sourceMappingURL=products.service.spec.js.map