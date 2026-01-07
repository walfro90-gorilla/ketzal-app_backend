import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createServiceDto: CreateServiceDto): Promise<PrismaService>;
    findAll(): PrismaService;
    findAllWithReviewStats(): Promise<any>;
    findAllWithAverageRating(): Promise<any>;
    findOne(id: number): Promise<PrismaService>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<PrismaService>;
    getServiceWithSupplier(id: number): Promise<PrismaService>;
    remove(id: number): Promise<PrismaService>;
    getServicesBySupplier(supplierId: number): Promise<PrismaService>;
    private checkServiceDependencies;
    getServiceDependencies(serviceId: number): Promise<{
        hasReviews: boolean;
        reviewsCount: any;
    }>;
    getReviews(serviceId: number): Promise<PrismaService>;
    findAllWithBusInfo(filters: {
        page: number;
        limit: number;
        search?: string;
        hasTransport?: boolean;
    }): Promise<{
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
    search(name: string, location: string, startDate: Date, endDate: Date, page: number, limit: number): Promise<{
        data: any;
        total: any;
        pagination: {
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getBusTransportConfig(id: number): Promise<{
        hasBusTransport: boolean;
        busLayout: null;
        seatPricing: null;
        message: string;
        $extends: import("@prisma/client/runtime/library").ExtendsHook<"extends", import(".prisma/client").Prisma.TypeMapCb<import(".prisma/client").Prisma.PrismaClientOptions>, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & import("@prisma/client/runtime/library").DefaultArgs, {}>>;
    }>;
    updateBusTransportConfig(id: number, updateData: any): Promise<{
        message: string;
        $extends: import("@prisma/client/runtime/library").ExtendsHook<"extends", import(".prisma/client").Prisma.TypeMapCb<import(".prisma/client").Prisma.PrismaClientOptions>, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & import("@prisma/client/runtime/library").DefaultArgs, {}>>;
    }>;
}
