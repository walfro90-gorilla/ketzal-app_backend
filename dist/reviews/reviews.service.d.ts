import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        Service: {
            name: string;
            id: number;
        };
        User: {
            name: string | null;
            id: string;
            image: string | null;
        };
    } & {
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }[]>;
    findOne(id: number): Promise<{
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    getReviewsByService(serviceId: number): import(".prisma/client").Prisma.PrismaPromise<({
        User: {
            name: string | null;
            id: string;
            image: string | null;
        };
    } & {
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    })[]>;
    getReviewStatsForService(serviceId: number): Promise<{
        totalReviews: number;
        averageRating: number;
        serviceId: number;
    }>;
    createReview(serviceId: number, userId: string, rating: number, comment: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        createdAt: Date;
        id: number;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
