import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';
export declare class GlobalLocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDto: CreateGlobalLocationDto): import(".prisma/client").Prisma.Prisma__global_locationsClient<{
        id: number;
        country: string;
        state: string;
        city: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
    update(id: number, updateDto: UpdateGlobalLocationDto): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
}
