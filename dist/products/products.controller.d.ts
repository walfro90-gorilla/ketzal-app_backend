import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        priceAxo: number | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
    }>;
    findAll(): Promise<any[]>;
    findByCategory(category: string): Promise<any[]>;
    searchProducts(query: string, category?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        priceAxo: number | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
    }>;
    remove(id: string): Promise<{
        name: string;
        description: string | null;
        price: number;
        stock: number;
        image: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        images: import("@prisma/client/runtime/library").JsonValue | null;
        priceAxo: number | null;
        specifications: import("@prisma/client/runtime/library").JsonValue | null;
        tags: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
    }>;
}
