import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        tags: import("@prisma/client/runtime/library").JsonValue | null;
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
        images: import("@prisma/client/runtime/library").JsonValue | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    } | undefined>;
    findAll(): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        tags: import("@prisma/client/runtime/library").JsonValue | null;
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
        images: import("@prisma/client/runtime/library").JsonValue | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        tags: import("@prisma/client/runtime/library").JsonValue | null;
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
        images: import("@prisma/client/runtime/library").JsonValue | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
