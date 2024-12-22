import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        id: number;
        supplierId: number;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        supplierId: number;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        supplierId: number;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        createdAt: Date;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        id: number;
        supplierId: number;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        supplierId: number;
        name: string;
        description: string | null;
        price: number;
        location: string | null;
        availableFrom: Date | null;
        availableTo: Date | null;
        createdAt: Date;
    }>;
}
