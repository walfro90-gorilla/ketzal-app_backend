import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
