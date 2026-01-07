import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    remove(id: number): Promise<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }>;
    getReviewsByService(serviceId: number): import(".prisma/client").Prisma.PrismaPromise<({
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
    getReviewStatsForService(serviceId: number): Promise<{
        totalReviews: number;
        averageRating: number;
        serviceId: number;
    }>;
    createReview(serviceId: number, userId: string, rating: number, comment: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        rating: number;
        comment: string;
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
