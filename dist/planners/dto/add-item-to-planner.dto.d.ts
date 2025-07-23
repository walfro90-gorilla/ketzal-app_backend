export declare class AddItemToPlannerDto {
    readonly plannerId: string;
    readonly serviceId?: number;
    readonly productId?: number;
    readonly quantity: number;
    readonly priceMXN: number;
    readonly priceAxo?: number;
    readonly selectedDate?: string;
    readonly notes?: string;
}
