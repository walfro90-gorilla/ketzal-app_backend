import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ServicesService {
    private prismaService;
    constructor(prismaService: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<{
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
    remove(id: number): Promise<{
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
