import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): import(".prisma/client").Prisma.Prisma__ServiceClient<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        createdAt: Date;
        location: string | null;
        supplierId: number;
        availableFrom: Date | null;
        availableTo: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        createdAt: Date;
        location: string | null;
        supplierId: number;
        availableFrom: Date | null;
        availableTo: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        createdAt: Date;
        location: string | null;
        supplierId: number;
        availableFrom: Date | null;
        availableTo: Date | null;
    }>;
    update(id: string, updateServiceDto: UpdateServiceDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        createdAt: Date;
        location: string | null;
        supplierId: number;
        availableFrom: Date | null;
        availableTo: Date | null;
    }>;
    remove(id: string): Promise<{
        name: string;
        id: number;
        description: string | null;
        price: number;
        createdAt: Date;
        location: string | null;
        supplierId: number;
        availableFrom: Date | null;
        availableTo: Date | null;
    }>;
}
