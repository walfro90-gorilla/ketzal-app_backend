import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class SuppliersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
    } | undefined>;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
    }>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
    }>;
}
