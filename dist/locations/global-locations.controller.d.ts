import { GlobalLocationsService } from './global-locations.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';
export declare class GlobalLocationsController {
    private readonly globalLocationsService;
    constructor(globalLocationsService: GlobalLocationsService);
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
    findOne(id: string): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
    update(id: string, updateDto: UpdateGlobalLocationDto): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
    remove(id: string): Promise<{
        id: number;
        country: string;
        state: string;
        city: string;
    }>;
}
