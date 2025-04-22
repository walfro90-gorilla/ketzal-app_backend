import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        image: string;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        name: string;
        image: string;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        image: string;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        image: string;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        image: string;
        updatedAt: Date;
        description: string | null;
        price: number;
        stock: number;
    }>;
}
