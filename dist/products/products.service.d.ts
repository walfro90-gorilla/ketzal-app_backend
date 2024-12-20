import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
