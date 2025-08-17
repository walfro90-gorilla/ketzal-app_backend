import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        tags: Prisma.JsonValue | null;
        id: number;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        priceAxo: number | null;
        price: number;
        stock: number;
        category: string | null;
        images: Prisma.JsonValue | null;
        specifications: Prisma.JsonValue | null;
    } | undefined>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        tags: Prisma.JsonValue | null;
        id: number;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        priceAxo: number | null;
        price: number;
        stock: number;
        category: string | null;
        images: Prisma.JsonValue | null;
        specifications: Prisma.JsonValue | null;
    }>;
    remove(id: number): Promise<{
        tags: Prisma.JsonValue | null;
        id: number;
        name: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        priceAxo: number | null;
        price: number;
        stock: number;
        category: string | null;
        images: Prisma.JsonValue | null;
        specifications: Prisma.JsonValue | null;
    }>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    private parseProductJson;
}
