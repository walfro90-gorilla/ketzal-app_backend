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
            items: ({
                service: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    supplierId: number;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
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
                product: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image: string;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    stock: number;
                    category: string | null;
                    specifications: import("@prisma/client/runtime/library").JsonValue | null;
                    tags: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                plannerId: string;
                serviceId: number | null;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                priceAxo: number | null;
                selectedDate: Date | null;
                notes: string | null;
            })[];
            user: {
                id: string;
                name: string | null;
                email: string;
            };
        } & {
            id: string;
            userId: string;
            name: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getUserPlanners(req: any): Promise<{
        success: boolean;
        message: string;
        data: ({
            items: ({
                service: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    supplierId: number;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
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
                product: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image: string;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    stock: number;
                    category: string | null;
                    specifications: import("@prisma/client/runtime/library").JsonValue | null;
                    tags: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                plannerId: string;
                serviceId: number | null;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                priceAxo: number | null;
                selectedDate: Date | null;
                notes: string | null;
            })[];
            _count: {
                items: number;
            };
        } & {
            id: string;
            userId: string;
            name: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    getPlannerById(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            items: ({
                service: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    supplierId: number;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
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
                product: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image: string;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    stock: number;
                    category: string | null;
                    specifications: import("@prisma/client/runtime/library").JsonValue | null;
                    tags: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                plannerId: string;
                serviceId: number | null;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                priceAxo: number | null;
                selectedDate: Date | null;
                notes: string | null;
            })[];
            user: {
                id: string;
                name: string | null;
                email: string;
            };
        } & {
            id: string;
            userId: string;
            name: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updatePlanner(id: string, updatePlannerDto: UpdatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            items: ({
                service: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    supplierId: number;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    location: string | null;
                    availableFrom: Date | null;
                    availableTo: Date | null;
                    packs: import("@prisma/client/runtime/library").JsonValue | null;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    ytLink: string | null;
                    sizeTour: number | null;
                    serviceType: string | null;
                    serviceCategory: string | null;
                    stateFrom: string | null;
                    cityFrom: string | null;
                    stateTo: string | null;
                    cityTo: string | null;
                    includes: import("@prisma/client/runtime/library").JsonValue | null;
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
                product: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image: string;
                    priceAxo: number | null;
                    description: string | null;
                    price: number;
                    images: import("@prisma/client/runtime/library").JsonValue | null;
                    stock: number;
                    category: string | null;
                    specifications: import("@prisma/client/runtime/library").JsonValue | null;
                    tags: import("@prisma/client/runtime/library").JsonValue | null;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                plannerId: string;
                serviceId: number | null;
                productId: number | null;
                quantity: number;
                priceMXN: number;
                priceAxo: number | null;
                selectedDate: Date | null;
                notes: string | null;
            })[];
        } & {
            id: string;
            userId: string;
            name: string;
            destination: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: import(".prisma/client").$Enums.PlannerStatus;
            totalMXN: number;
            totalAxo: number;
            isPublic: boolean;
            shareCode: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            service: {
                id: number;
                name: string;
                createdAt: Date;
                supplierId: number;
                priceAxo: number | null;
                description: string | null;
                price: number;
                location: string | null;
                availableFrom: Date | null;
                availableTo: Date | null;
                packs: import("@prisma/client/runtime/library").JsonValue | null;
                images: import("@prisma/client/runtime/library").JsonValue | null;
                ytLink: string | null;
                sizeTour: number | null;
                serviceType: string | null;
                serviceCategory: string | null;
                stateFrom: string | null;
                cityFrom: string | null;
                stateTo: string | null;
                cityTo: string | null;
                includes: import("@prisma/client/runtime/library").JsonValue | null;
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
            product: {
                id: number;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                image: string;
                priceAxo: number | null;
                description: string | null;
                price: number;
                images: import("@prisma/client/runtime/library").JsonValue | null;
                stock: number;
                category: string | null;
                specifications: import("@prisma/client/runtime/library").JsonValue | null;
                tags: import("@prisma/client/runtime/library").JsonValue | null;
            } | null;
            planner: {
                id: string;
                userId: string;
                name: string;
                destination: string | null;
                startDate: Date | null;
                endDate: Date | null;
                status: import(".prisma/client").$Enums.PlannerStatus;
                totalMXN: number;
                totalAxo: number;
                isPublic: boolean;
                shareCode: string | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            plannerId: string;
            serviceId: number | null;
            productId: number | null;
            quantity: number;
            priceMXN: number;
            priceAxo: number | null;
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
