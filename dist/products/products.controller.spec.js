"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const mockProduct = {
    id: 1,
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
    createdAt: new Date(),
    updatedAt: new Date(),
    supplierId: null,
};
const mockProductsService = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    remove: jest.fn().mockResolvedValue(mockProduct),
    findByCategory: jest.fn().mockResolvedValue([mockProduct]),
    searchProducts: jest.fn().mockResolvedValue([mockProduct]),
};
describe('ProductsController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [products_controller_1.ProductsController],
            providers: [
                {
                    provide: products_service_1.ProductsService,
                    useValue: mockProductsService,
                },
            ],
        }).compile();
        controller = module.get(products_controller_1.ProductsController);
        service = module.get(products_service_1.ProductsService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should create a product', async () => {
            const createProductDto = {
                name: 'New Product',
                description: 'Description of new product',
                price: 150.00,
                priceAxo: 7.50,
                stock: 100,
                image: 'new-product.jpg',
                category: 'electronics',
                images: ['img1.jpg', 'img2.jpg'],
                specifications: { weight: '1kg' },
                tags: ['tag1', 'tag2'],
            };
            const result = await controller.create(createProductDto);
            expect(service.create).toHaveBeenCalledWith(createProductDto);
            expect(result).toEqual(mockProduct);
        });
    });
    describe('findAll', () => {
        it('should return an array of products', async () => {
            const result = await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
            expect(result).toEqual([mockProduct]);
        });
    });
    describe('findOne', () => {
        it('should return a single product', async () => {
            const result = await controller.findOne('1');
            expect(service.findOne).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockProduct);
        });
    });
    describe('findByCategory', () => {
        it('should return products by category', async () => {
            const category = 'TestCategory';
            const result = await controller.findByCategory(category);
            expect(service.findByCategory).toHaveBeenCalledWith(category);
            expect(result).toEqual([mockProduct]);
        });
    });
    describe('searchProducts', () => {
        it('should return products matching the search query', async () => {
            const query = 'Test';
            const category = 'TestCategory';
            const result = await controller.searchProducts(query, category);
            expect(service.searchProducts).toHaveBeenCalledWith(query, category);
            expect(result).toEqual([mockProduct]);
        });
    });
    describe('update', () => {
        it('should update a product', async () => {
            const updateProductDto = { name: 'Updated Product' };
            const result = await controller.update('1', updateProductDto);
            expect(service.update).toHaveBeenCalledWith(1, updateProductDto);
            expect(result).toEqual(mockProduct);
        });
    });
    describe('remove', () => {
        it('should delete a product', async () => {
            const result = await controller.remove('1');
            expect(service.remove).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockProduct);
        });
    });
});
//# sourceMappingURL=products.controller.spec.js.map