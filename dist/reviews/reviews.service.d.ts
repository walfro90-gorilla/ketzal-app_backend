import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createReviewDto: CreateReviewDto): import(".prisma/client").Prisma.Prisma__ReviewClient<{
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
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }>;
    getReviewsByService(serviceId: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }[]>;
    createReview(serviceId: number, userId: string, rating: number, comment: string): import(".prisma/client").Prisma.Prisma__ReviewClient<{
        id: number;
        createdAt: Date;
        serviceId: number;
        userId: string;
        rating: number;
        comment: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
