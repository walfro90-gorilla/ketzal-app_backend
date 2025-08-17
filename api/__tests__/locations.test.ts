import { Test, TestingModule } from '@nestjs/testing';
import { GlobalLocationsController } from '../../src/locations/global-locations.controller';
import { GlobalLocationsService } from '../../src/locations/global-locations.service';

describe('GlobalLocationsController', () => {
  let controller: GlobalLocationsController;
  const mockGlobalLocationsService = {
    findAll: jest.fn(() => Promise.resolve(['test'])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalLocationsController],
      providers: [
        { provide: GlobalLocationsService, useValue: mockGlobalLocationsService },
      ],
    }).compile();

    controller = module.get<GlobalLocationsController>(GlobalLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all locations', async () => {
    expect(await controller.findAll()).toEqual(['test']);
  });
});
