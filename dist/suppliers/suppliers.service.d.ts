import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SuppliersService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
    }[]>;
    search(name?: string, email?: string): Promise<{
        id: number;
        createdAt: Date;
        name: string;
        contactEmail: string;
    }[]>;
    checkDuplicate(name?: string, email?: string, excludeId?: number): Promise<{
        nameExists: boolean;
        emailExists: boolean;
        existingSuppliers: any[];
    }>;
    checkDependencies(id: number): Promise<{
        supplier: {
            id: number;
            name: string;
        };
        services: {
            id: number;
            name: string;
        }[];
        users: {
            id: string;
            name: string | null;
            email: string;
        }[];
        transportServices: {
            id: number;
            name: string;
        }[];
        hotelServices: {
            id: number;
            name: string;
        }[];
        canDelete: boolean;
        totalDependencies: number;
    }>;
    findOne(id: number): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
    }>;
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        createdAt: Date;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        deletedSupplier: {
            info: import("@prisma/client/runtime/library").JsonValue | null;
            id: number;
            createdAt: Date;
            name: string;
            description: string | null;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            contactEmail: string;
            phoneNumber: string | null;
            address: string | null;
            imgLogo: string | null;
            supplierType: string | null;
            photos: import("@prisma/client/runtime/library").JsonValue | null;
            extras: import("@prisma/client/runtime/library").JsonValue | null;
            supplierSubType: string | null;
        };
    }>;
    softDelete(id: number): Promise<{
        success: boolean;
        message: string;
        supplier: {
            info: import("@prisma/client/runtime/library").JsonValue | null;
            id: number;
            createdAt: Date;
            name: string;
            description: string | null;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            contactEmail: string;
            phoneNumber: string | null;
            address: string | null;
            imgLogo: string | null;
            supplierType: string | null;
            photos: import("@prisma/client/runtime/library").JsonValue | null;
            extras: import("@prisma/client/runtime/library").JsonValue | null;
            supplierSubType: string | null;
        };
    }>;
}
