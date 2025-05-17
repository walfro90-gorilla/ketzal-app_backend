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
        userId: string;
        serviceId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }>;
    getReviewsByService(serviceId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }[]>;
    createReview(serviceId: number, userId: string, rating: number, comment: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        rating: number;
        comment: string;
        userId: string;
        serviceId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
