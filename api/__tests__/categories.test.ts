import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../src/categories/categories.controller';
import { CategoriesService } from '../../src/categories/categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  const mockCategoriesService = {
    findAll: jest.fn(() => Promise.resolve(['test'])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all categories', async () => {
    expect(await controller.findAll()).toEqual(['test']);
  });
});