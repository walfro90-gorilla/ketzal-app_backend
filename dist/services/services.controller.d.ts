import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<{
        message: string;
        data: import("../prisma/prisma.service").PrismaService;
    }>;
    findAll(page?: string, limit?: string, search?: string, hasTransport?: string): import("../prisma/prisma.service").PrismaService | Promise<{
        services: any;
        pagination: {
            page: number;
            limit: number;
            total: any;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        stats: {
            total: any;
            withTransport: number;
            withoutTransport: any;
        };
    }>;
    findAllWithReviewStats(): Promise<any>;
    findOne(id: string): Promise<import("../prisma/prisma.service").PrismaService>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<import("../prisma/prisma.service").PrismaService>;
    getServiceDependencies(id: string): Promise<{
        hasReviews: boolean;
        reviewsCount: any;
    }>;
    getBusTransportConfig(id: number): Promise<{
        hasBusTransport: boolean;
        busLayout: null;
        seatPricing: null;
        message: string;
        $extends: import("@prisma/client/runtime/library").ExtendsHook<"extends", import(".prisma/client").Prisma.TypeMapCb<import(".prisma/client").Prisma.PrismaClientOptions>, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & import("@prisma/client/runtime/library").DefaultArgs, {}>>;
    }>;
    updateBusTransportConfig(id: number, updateBusTransportDto: any): Promise<{
        message: string;
        service: {
            message: string;
            $extends: import("@prisma/client/runtime/library").ExtendsHook<"extends", import(".prisma/client").Prisma.TypeMapCb<import(".prisma/client").Prisma.PrismaClientOptions>, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & import("@prisma/client/runtime/library").DefaultArgs, {}>>;
        };
    }>;
    remove(id: string): Promise<import("../prisma/prisma.service").PrismaService>;
}
