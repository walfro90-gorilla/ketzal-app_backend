"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByCategory: jest.fn(),
    searchProducts: jest.fn(),
};
describe('ProductsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [products_controller_1.ProductsController],
            providers: [
                { provide: products_service_1.ProductsService, useValue: mockProductsService },
            ],
        }).compile();
        controller = module.get(products_controller_1.ProductsController);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('create', () => {
        it('should call productsService.create with the correct data', async () => {
            const createProductDto = { name: 'Test Product', description: 'Test Description', price: 100, stock: 10, category: 'Test Category', image: 'test.jpg' };
            await controller.create(createProductDto);
            expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
        });
    });
    describe('findAll', () => {
        it('should call productsService.findAll', async () => {
            await controller.findAll();
            expect(mockProductsService.findAll).toHaveBeenCalled();
        });
    });
    describe('findByCategory', () => {
        it('should call productsService.findByCategory with the correct category', async () => {
            const category = 'Test Category';
            await controller.findByCategory(category);
            expect(mockProductsService.findByCategory).toHaveBeenCalledWith(category);
        });
    });
    describe('searchProducts', () => {
        it('should call productsService.searchProducts with the correct data', async () => {
            const query = 'Test';
            const category = 'Test Category';
            await controller.searchProducts(query, category);
            expect(mockProductsService.searchProducts).toHaveBeenCalledWith(query, category);
        });
    });
    describe('findOne', () => {
        it('should call productsService.findOne with the correct id', async () => {
            const id = '1';
            await controller.findOne(id);
            expect(mockProductsService.findOne).toHaveBeenCalledWith(+id);
        });
    });
    describe('update', () => {
        it('should call productsService.update with the correct data', async () => {
            const id = '1';
            const updateProductDto = { name: 'Test' };
            await controller.update(id, updateProductDto);
            expect(mockProductsService.update).toHaveBeenCalledWith(+id, updateProductDto);
        });
    });
    describe('remove', () => {
        it('should call productsService.remove with the correct id', async () => {
            const id = '1';
            await controller.remove(id);
            expect(mockProductsService.remove).toHaveBeenCalledWith(+id);
        });
    });
});
//# sourceMappingURL=products.controller.spec.js.map