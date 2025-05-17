import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }>;
    getReviews(serviceId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }[]>;
    createReview(serviceId: string, body: {
        rating: number;
        comment: string;
        userId: number;
    }, req: any): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
