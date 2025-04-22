import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }>;
    getReviewsByService(serviceId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }[]>;
    createReview(serviceId: number, userId: string, rating: number, comment: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        serviceId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
