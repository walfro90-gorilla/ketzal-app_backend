import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Mock data
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
  product: {
    create: jest.fn().mockResolvedValue(mockProduct),
    findMany: jest.fn().mockResolvedValue([mockProduct]),
    findUnique: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(mockProduct),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
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

      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          ...createProductDto,
          image: 'image.jpg',
          images: [],
          specifications: {},
          tags: [],
        },
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

      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'Product with this name already exists',
        { code: 'P2002', clientVersion: 'mock' }
      );
      
      (prisma.product.create as jest.Mock).mockRejectedValue(prismaError);

      await expect(service.create(createProductDto)).rejects.toThrow(
        new ConflictException(`Product with name ${createProductDto.name} already exists`)
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts = [
        { ...mockProduct, id: 1, name: 'Product 1' },
        { ...mockProduct, id: 2, name: 'Product 2', images: '["img1.jpg"]', specifications: '{"key":"value"}', tags: '["tag1"]' },
      ];
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(prisma.product.findMany).toHaveBeenCalled();
      expect(result).toEqual([
        { ...mockProduct, id: 1, name: 'Product 1', images: [], specifications: {}, tags: [] },
        { ...mockProduct, id: 2, name: 'Product 2', images: ['img1.jpg'], specifications: { key: 'value' }, tags: ['tag1'] },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(mockProduct);
      const result = await service.findOne(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({ ...mockProduct, images: [], specifications: {}, tags: [] });
    });

    it('should throw a NotFoundException if product is not found', async () => {
      (prisma.product.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product successfully', async () => {
      const updateDto = { name: 'Updated Name' };
      const updatedProduct = { ...mockProduct, ...updateDto };
      (prisma.product.update as jest.Mock).mockResolvedValue(updatedProduct);

      const result = await service.update(1, updateDto);

      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
      });
      expect(result).toEqual(updatedProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product successfully', async () => {
      (prisma.product.delete as jest.Mock).mockResolvedValue(mockProduct);
      const result = await service.remove(1);
      expect(prisma.product.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockProduct);
    });

    it('should throw a NotFoundException if delete returns a falsy value', async () => {
        (prisma.product.delete as jest.Mock).mockResolvedValue(null);
        await expect(service.remove(99)).rejects.toThrow(new NotFoundException(`Product with id 99 not found`));
      });
  });

  describe('findByCategory', () => {
    it('should return products for a given category', async () => {
      const category = 'Test';
      const mockProducts = [{ ...mockProduct, category: category }];
      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);

      const result = await service.findByCategory(category);

      expect(prisma.product.findMany).toHaveBeenCalledWith({ where: { category: category } });
      expect(result).toEqual([{ ...mockProduct, category: category, images: [], specifications: {}, tags: [] }]);
    });
  });

  describe('searchProducts', () => {
    it('should return products matching the query', async () => {
      const query = 'Test';
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await service.searchProducts(query);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ name: { contains: query } }, { description: { contains: query } }],
            },
            {},
          ],
        },
      });
      expect(result).toEqual([{ ...mockProduct, images: [], specifications: {}, tags: [] }]);
    });

    it('should return products matching the query and category', async () => {
      const query = 'Test';
      const category = 'TestCategory';
      (prisma.product.findMany as jest.Mock).mockResolvedValue([mockProduct]);

      const result = await service.searchProducts(query, category);

      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            {
              OR: [{ name: { contains: query } }, { description: { contains: query } }],
            },
            { category: category },
          ],
        },
      });
      expect(result).toEqual([{ ...mockProduct, images: [], specifications: {}, tags: [] }]);
    });
  });
});