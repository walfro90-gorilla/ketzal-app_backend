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
        images: Prisma.JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: Prisma.JsonValue | null;
        stock: number;
        category: string | null;
        specifications: Prisma.JsonValue | null;
    } | undefined>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string | null;
        images: Prisma.JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: Prisma.JsonValue | null;
        stock: number;
        category: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        images: Prisma.JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: Prisma.JsonValue | null;
        stock: number;
        category: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    private parseProductJson;
}
