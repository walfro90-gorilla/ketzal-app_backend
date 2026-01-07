import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        Service: {
            id: number;
            name: string;
        };
        User: {
            id: string;
            name: string | null;
            image: string | null;
        };
    } & {
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    remove(id: string): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    getReviews(serviceId: string): import(".prisma/client").Prisma.PrismaPromise<({
        User: {
            id: string;
            name: string | null;
            image: string | null;
        };
    } & {
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
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
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
