import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call productsService.create with the correct data', async () => {
      const createProductDto: CreateProductDto = { name: 'Test Product', description: 'Test Description', price: 100, stock: 10, category: 'Test Category', image: 'test.jpg' };
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
      const updateProductDto: UpdateProductDto = { name: 'Test' };
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
