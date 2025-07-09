import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        service: {
            id: number;
            name: string;
        };
        user: {
            id: string;
            name: string | null;
            image: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    getReviews(serviceId: string): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string | null;
            image: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    })[]>;
    getReviewStats(serviceId: string): Promise<{
        totalReviews: number;
        averageRating: number;
        serviceId: number;
    }>;
    createReview(serviceId: string, body: {
        rating: number;
        comment: string;
        userId: number;
    }, req: any): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
