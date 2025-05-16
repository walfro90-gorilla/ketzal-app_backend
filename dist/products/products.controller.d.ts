import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        name: string;
        image: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        image: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        name: string;
        image: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        name: string;
        image: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        image: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        price: number;
        stock: number;
    }>;
}
