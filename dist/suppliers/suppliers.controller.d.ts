import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<{
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
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
    checkDuplicate(name?: string, email?: string, excludeId?: string): Promise<{
        nameExists: boolean;
        emailExists: boolean;
        existingSuppliers: any[];
    }>;
    search(name?: string, email?: string): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        contactEmail: string;
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
        description: string | null;
        createdAt: Date;
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
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        id: number;
        name: string;
        description: string | null;
        createdAt: Date;
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
    remove(id: string): Promise<{
        success: boolean;
        message: string;
        deletedSupplier: {
            info: import("@prisma/client/runtime/library").JsonValue | null;
            id: number;
            name: string;
            description: string | null;
            createdAt: Date;
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
