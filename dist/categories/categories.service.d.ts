import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createCategoryDto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoriesClient<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        image: string | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        image: string | null;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        image: string | null;
        updatedAt: Date;
    }>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        image: string | null;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        image: string | null;
        updatedAt: Date;
    }>;
}
