import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
        supplierType: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
        supplierType: string | null;
        supplierSubType: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
    checkDuplicate(name?: string, email?: string, excludeId?: string): Promise<{
        nameExists: boolean;
        emailExists: boolean;
        existingSuppliers: any[];
    }>;
    search(name?: string, email?: string): Promise<{
        id: number;
        name: string;
        contactEmail: string;
        createdAt: Date;
    }[]>;
    checkDependencies(id: string): Promise<{
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
    findOne(id: string): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
        supplierType: string | null;
        supplierSubType: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        description: string | null;
        imgLogo: string | null;
        createdAt: Date;
        supplierType: string | null;
        supplierSubType: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        deletedSupplier: {
            info: import("@prisma/client/runtime/library").JsonValue | null;
            id: number;
            name: string;
            contactEmail: string;
            phoneNumber: string | null;
            address: string | null;
            description: string | null;
            imgLogo: string | null;
            createdAt: Date;
            supplierType: string | null;
            supplierSubType: string | null;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            photos: import("@prisma/client/runtime/library").JsonValue | null;
            extras: import("@prisma/client/runtime/library").JsonValue | null;
        };
    }>;
}
