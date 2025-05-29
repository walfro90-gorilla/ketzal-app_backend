export type ServiceDateRange = {
    availableFrom: string;
    availableTo: string;
};
export declare class CreateServiceDto {
    name: string;
    price: number;
    supplierId: number;
    description?: string;
    packs?: any;
    dates?: ServiceDateRange[];
}
