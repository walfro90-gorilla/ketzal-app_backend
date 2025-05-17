import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
