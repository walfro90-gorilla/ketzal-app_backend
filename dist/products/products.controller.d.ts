import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        description: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        stock: number;
        category: string | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        stock: number;
        category: string | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        price: number;
        createdAt: Date;
        priceAxo: number | null;
        id: number;
        image: string;
        updatedAt: Date;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        stock: number;
        category: string | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
