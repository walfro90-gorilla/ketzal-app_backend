import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGlobalLocationDto } from './dto/create-global-location.dto';
import { UpdateGlobalLocationDto } from './dto/update-global-location.dto';
export declare class GlobalLocationsService {
    private prisma;
    constructor(prisma: PrismaService);
    private transformBigInt;
    create(createDto: CreateGlobalLocationDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateDto: UpdateGlobalLocationDto): Promise<any>;
    remove(id: number): Promise<{
        id: bigint;
        country: string;
        state: string;
        city: string;
    }>;
}
