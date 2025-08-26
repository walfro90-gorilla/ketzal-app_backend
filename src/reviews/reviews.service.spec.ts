import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    reviews: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const dto = { rating: 5, comment: 'test', serviceId: 1, userId: '1' };
      mockPrismaService.reviews.create.mockResolvedValue({ id: 1, ...dto });
      const result = await service.create(dto);
      expect(result).toBeDefined();
      expect(prisma.reviews.create).toHaveBeenCalled();
    });

    it('should throw an error if required fields are missing', async () => {
      const dto = { rating: 5, comment: 'test', serviceId: 1, userId: '' };
      try {
        await service.create(dto);
      } catch (error) {
        expect((error as Error).message).toBe('Missing required fields: rating, comment, serviceId, userId');
      }
    });
  });

  describe('findAll', () => {
    it('should return all reviews', async () => {
      const reviews = [{id: 1, name: 'test'}];
      mockPrismaService.reviews.findMany.mockResolvedValue(reviews);
      const result = await service.findAll();
      expect(result).toEqual(reviews);
    });
  });

  describe('findOne', () => {
    it('should return a review', async () => {
      const review = {id: 1, name: 'test'};
      mockPrismaService.reviews.findUnique.mockResolvedValue(review);
      const result = await service.findOne(1);
      expect(result).toEqual(review);
    });

    it('should throw not found exception', async () => {
      mockPrismaService.reviews.findUnique.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow('Review #1 not found');
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const review = {id: 1, name: 'test'};
      mockPrismaService.reviews.update.mockResolvedValue(review);
      const result = await service.update(1, {comment: 'test'});
      expect(result).toEqual(review);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const review = {id: 1, name: 'test'};
      mockPrismaService.reviews.delete.mockResolvedValue(review);
      const result = await service.remove(1);
      expect(result).toEqual(review);
    });
  });

  describe('getReviewsByService', () => {
    it('should return reviews for a service', async () => {
      const reviews = [{id: 1, name: 'test'}];
      mockPrismaService.reviews.findMany.mockResolvedValue(reviews);
      const result = await service.getReviewsByService(1);
      expect(result).toEqual(reviews);
    });
  });

  describe('getReviewStatsForService', () => {
    it('should return review stats for a service', async () => {
      const reviews = [{rating: 5}, {rating: 4}];
      mockPrismaService.reviews.findMany.mockResolvedValue(reviews);
      const result = await service.getReviewStatsForService(1);
      expect(result).toEqual({ totalReviews: 2, averageRating: 4.5, serviceId: 1 });
    });
  });

  describe('createReview', () => {
    it('should create a review', async () => {
      const review = {id: 1, name: 'test'};
      mockPrismaService.reviews.create.mockResolvedValue(review);
      const result = await service.createReview(1, '1', 5, 'test');
      expect(result).toEqual(review);
    });
  });
});
