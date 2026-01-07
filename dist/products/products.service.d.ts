import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: Prisma.JsonValue | null;
        priceAxo: number | null;
        specifications: Prisma.JsonValue | null;
        tags: Prisma.JsonValue | null;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: Prisma.JsonValue | null;
        priceAxo: number | null;
        specifications: Prisma.JsonValue | null;
        tags: Prisma.JsonValue | null;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: Prisma.JsonValue | null;
        priceAxo: number | null;
        specifications: Prisma.JsonValue | null;
        tags: Prisma.JsonValue | null;
        id: number;
    }>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    private parseProductJson;
}
