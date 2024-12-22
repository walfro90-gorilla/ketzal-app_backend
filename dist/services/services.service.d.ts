import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
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
    remove(id: number): Promise<{
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
