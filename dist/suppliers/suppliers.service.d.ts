import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class SuppliersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        name: string;
        id: number;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
    }>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
        name: string;
        id: number;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        id: number;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
    }>;
}
