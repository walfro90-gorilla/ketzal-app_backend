export declare class Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    priceAxo?: number;
    stock: number;
    image: string;
    category?: string;
    images?: string[];
    specifications?: {
        weight?: string;
        dimensions?: string;
        material?: string;
        capacity?: string;
        features?: string[];
    };
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
