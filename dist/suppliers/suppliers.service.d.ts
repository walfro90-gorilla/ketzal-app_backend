import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SuppliersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        supplierSubType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    } | undefined>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        supplierSubType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    findOne(id: number): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        supplierSubType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        supplierSubType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: number): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        supplierSubType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
