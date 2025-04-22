import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    getReviews(serviceId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }[]>;
    createReview(serviceId: string, body: {
        rating: number;
        comment: string;
        userId: number;
    }, req: any): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
