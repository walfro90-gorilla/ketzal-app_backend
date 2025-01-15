import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        packs: import("@prisma/client/runtime/library").JsonValue | null;
        supplierId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        packs: import("@prisma/client/runtime/library").JsonValue | null;
        supplierId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        packs: import("@prisma/client/runtime/library").JsonValue | null;
        supplierId: number;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        packs: import("@prisma/client/runtime/library").JsonValue | null;
        supplierId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        packs: import("@prisma/client/runtime/library").JsonValue | null;
        supplierId: number;
    }>;
}
