import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
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
    remove(id: number): Promise<{
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
