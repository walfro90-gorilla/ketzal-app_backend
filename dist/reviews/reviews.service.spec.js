"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reviews_service_1 = require("./reviews.service");
const prisma_service_1 = require("../prisma/prisma.service");
describe('ReviewsService', () => {
    let service;
    let prisma;
    const mockPrismaService = {
        review: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                reviews_service_1.ReviewsService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(reviews_service_1.ReviewsService);
        prisma = module.get(prisma_service_1.PrismaService);
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
            mockPrismaService.review.create.mockResolvedValue(Object.assign({ id: 1 }, dto));
            const result = await service.create(dto);
            expect(result).toBeDefined();
            expect(prisma.review.create).toHaveBeenCalled();
        });
        it('should throw an error if required fields are missing', async () => {
            const dto = { rating: 5, comment: 'test', serviceId: 1, userId: '' };
            try {
                await service.create(dto);
            }
            catch (error) {
                expect(error.message).toBe('Missing required fields: rating, comment, serviceId, userId');
            }
        });
    });
    describe('findAll', () => {
        it('should return all reviews', async () => {
            const reviews = [{ id: 1, name: 'test' }];
            mockPrismaService.review.findMany.mockResolvedValue(reviews);
            const result = await service.findAll();
            expect(result).toEqual(reviews);
        });
    });
    describe('findOne', () => {
        it('should return a review', async () => {
            const review = { id: 1, name: 'test' };
            mockPrismaService.review.findUnique.mockResolvedValue(review);
            const result = await service.findOne(1);
            expect(result).toEqual(review);
        });
        it('should throw not found exception', async () => {
            mockPrismaService.review.findUnique.mockResolvedValue(null);
            await expect(service.findOne(1)).rejects.toThrow('Review #1 not found');
        });
    });
    describe('update', () => {
        it('should update a review', async () => {
            const review = { id: 1, name: 'test' };
            mockPrismaService.review.update.mockResolvedValue(review);
            const result = await service.update(1, { comment: 'test' });
            expect(result).toEqual(review);
        });
    });
    describe('remove', () => {
        it('should remove a review', async () => {
            const review = { id: 1, name: 'test' };
            mockPrismaService.review.delete.mockResolvedValue(review);
            const result = await service.remove(1);
            expect(result).toEqual(review);
        });
    });
    describe('getReviewsByService', () => {
        it('should return reviews for a service', async () => {
            const reviews = [{ id: 1, name: 'test' }];
            mockPrismaService.review.findMany.mockResolvedValue(reviews);
            const result = await service.getReviewsByService(1);
            expect(result).toEqual(reviews);
        });
    });
    describe('getReviewStatsForService', () => {
        it('should return review stats for a service', async () => {
            const reviews = [{ rating: 5 }, { rating: 4 }];
            mockPrismaService.review.findMany.mockResolvedValue(reviews);
            const result = await service.getReviewStatsForService(1);
            expect(result).toEqual({ totalReviews: 2, averageRating: 4.5, serviceId: 1 });
        });
    });
    describe('createReview', () => {
        it('should create a review', async () => {
            const review = { id: 1, name: 'test' };
            mockPrismaService.review.create.mockResolvedValue(review);
            const result = await service.createReview(1, '1', 5, 'test');
            expect(result).toEqual(review);
        });
    });
});
//# sourceMappingURL=reviews.service.spec.js.map