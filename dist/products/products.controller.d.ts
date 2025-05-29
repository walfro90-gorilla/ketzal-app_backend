import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        stock: number;
        image: string;
        updatedAt: Date;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        stock: number;
        image: string;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        stock: number;
        image: string;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        stock: number;
        image: string;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        stock: number;
        image: string;
        updatedAt: Date;
    }>;
}
