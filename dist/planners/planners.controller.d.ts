import { PlannersService } from './planners.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
export declare class PlannersController {
    private readonly plannersService;
    constructor(plannersService: PlannersService);
    createPlanner(createPlannerDto: CreatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                name: string | null;
                email: string;
            };
            items: ({
                product: {
                    id: number;
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
                } | null;
                service: {
                    id: number;
                    name: string;
                    description: string | null;
                    price: number;
                    createdAt: Date;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    priceAxo: number | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
                    supplierId: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    excludes: import("@prisma/client/runtime/library").JsonValue | null;
                    faqs: import("@prisma/client/runtime/library").JsonValue | null;
                    itinerary: import("@prisma/client/runtime/library").JsonValue | null;
                    hotelProviderID: number | null;
                    transportProviderID: number | null;
                    dates: import("@prisma/client/runtime/library").JsonValue | null;
                    addOns: import("@prisma/client/runtime/library").JsonValue | null;
                    currentBookings: number | null;
                    maxCapacity: number | null;
                    seasonalPrices: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                priceAxo: number | null;
                serviceId: number | null;
                plannerId: string;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                selectedDate: Date | null;
                notes: string | null;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
        };
    }>;
    getUserPlanners(req: any): Promise<{
        success: boolean;
        message: string;
        data: ({
            _count: {
                items: number;
            };
            items: ({
                product: {
                    id: number;
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
                } | null;
                service: {
                    id: number;
                    name: string;
                    description: string | null;
                    price: number;
                    createdAt: Date;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    priceAxo: number | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
                    supplierId: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    excludes: import("@prisma/client/runtime/library").JsonValue | null;
                    faqs: import("@prisma/client/runtime/library").JsonValue | null;
                    itinerary: import("@prisma/client/runtime/library").JsonValue | null;
                    hotelProviderID: number | null;
                    transportProviderID: number | null;
                    dates: import("@prisma/client/runtime/library").JsonValue | null;
                    addOns: import("@prisma/client/runtime/library").JsonValue | null;
                    currentBookings: number | null;
                    maxCapacity: number | null;
                    seasonalPrices: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                priceAxo: number | null;
                serviceId: number | null;
                plannerId: string;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                selectedDate: Date | null;
                notes: string | null;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
        })[];
    }>;
    getPlannerById(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            user: {
                id: string;
                name: string | null;
                email: string;
            };
            items: ({
                product: {
                    id: number;
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
                } | null;
                service: {
                    id: number;
                    name: string;
                    description: string | null;
                    price: number;
                    createdAt: Date;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    priceAxo: number | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
                    supplierId: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    excludes: import("@prisma/client/runtime/library").JsonValue | null;
                    faqs: import("@prisma/client/runtime/library").JsonValue | null;
                    itinerary: import("@prisma/client/runtime/library").JsonValue | null;
                    hotelProviderID: number | null;
                    transportProviderID: number | null;
                    dates: import("@prisma/client/runtime/library").JsonValue | null;
                    addOns: import("@prisma/client/runtime/library").JsonValue | null;
                    currentBookings: number | null;
                    maxCapacity: number | null;
                    seasonalPrices: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                priceAxo: number | null;
                serviceId: number | null;
                plannerId: string;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                selectedDate: Date | null;
                notes: string | null;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
        };
    }>;
    updatePlanner(id: string, updatePlannerDto: UpdatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            items: ({
                product: {
                    id: number;
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
                } | null;
                service: {
                    id: number;
                    name: string;
                    description: string | null;
                    price: number;
                    createdAt: Date;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    priceAxo: number | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
                    supplierId: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    excludes: import("@prisma/client/runtime/library").JsonValue | null;
                    faqs: import("@prisma/client/runtime/library").JsonValue | null;
                    itinerary: import("@prisma/client/runtime/library").JsonValue | null;
                    hotelProviderID: number | null;
                    transportProviderID: number | null;
                    dates: import("@prisma/client/runtime/library").JsonValue | null;
                    addOns: import("@prisma/client/runtime/library").JsonValue | null;
                    currentBookings: number | null;
                    maxCapacity: number | null;
                    seasonalPrices: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                priceAxo: number | null;
                serviceId: number | null;
                plannerId: string;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                selectedDate: Date | null;
                notes: string | null;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
        };
    }>;
    deletePlanner(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            product: {
                id: number;
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
            } | null;
            service: {
                id: number;
                name: string;
                description: string | null;
                price: number;
                createdAt: Date;
                images: import("@prisma/client/runtime/library").JsonValue | null;
                priceAxo: number | null;
                includes: import("@prisma/client/runtime/library").JsonValue | null;
                supplierId: number;
                location: string | null;
                availableFrom: Date | null;
                availableTo: Date | null;
                packs: import("@prisma/client/runtime/library").JsonValue | null;
                ytLink: string | null;
                sizeTour: number | null;
                serviceType: string | null;
                serviceCategory: string | null;
                stateFrom: string | null;
                cityFrom: string | null;
                stateTo: string | null;
                cityTo: string | null;
                excludes: import("@prisma/client/runtime/library").JsonValue | null;
                faqs: import("@prisma/client/runtime/library").JsonValue | null;
                itinerary: import("@prisma/client/runtime/library").JsonValue | null;
                hotelProviderID: number | null;
                transportProviderID: number | null;
                dates: import("@prisma/client/runtime/library").JsonValue | null;
                addOns: import("@prisma/client/runtime/library").JsonValue | null;
                currentBookings: number | null;
                maxCapacity: number | null;
                seasonalPrices: import("@prisma/client/runtime/library").JsonValue | null;
            } | null;
            planner: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                destination: string | null;
                startDate: Date | null;
                endDate: Date | null;
                status: import(".prisma/client").$Enums.PlannerStatus;
                totalMXN: number;
                totalAxo: number;
                isPublic: boolean;
                shareCode: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            priceAxo: number | null;
            serviceId: number | null;
            plannerId: string;
            productId: number | null;
            quantity: number;
            priceMXN: number;
            selectedDate: Date | null;
            notes: string | null;
        };
    }>;
    removeItemFromPlanner(itemId: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getPlannerStats(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            totalItems: number;
            totalMXN: number;
            totalAxo: number;
            daysPlanned: number;
            itemsByDate: {
                date: string;
                items: any[];
                totalCost: number;
            }[];
        };
    }>;
}
