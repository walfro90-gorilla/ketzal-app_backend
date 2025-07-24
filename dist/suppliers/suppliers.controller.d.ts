import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierApprovalDto } from './dto/supplier-approval.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    getStats(): Promise<{
        totalSuppliers: number;
        totalServices: number;
        totalSupplierUsers: number;
        totalHotelServices: number;
        totalTransportServices: number;
    }>;
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
    findAll(pending?: string): Promise<({
        users: {
            id: string;
            name: string | null;
            createdAt: Date;
            email: string;
            password: string | null;
            emailVerified: Date | null;
            image: string | null;
            role: import(".prisma/client").$Enums.Role;
            supplierId: number | null;
            updatedAt: Date;
            axoCoinsEarned: number | null;
            referralCode: string | null;
        }[];
    } & {
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
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
    })[]>;
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
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
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
        location: import("@prisma/client/runtime/library").JsonValue | null;
        photos: import("@prisma/client/runtime/library").JsonValue | null;
        extras: import("@prisma/client/runtime/library").JsonValue | null;
        supplierSubType: string | null;
    }>;
    approveOrDeclineSupplier(id: string, approvalDto: SupplierApprovalDto): Promise<{
        success: boolean;
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
            location: import("@prisma/client/runtime/library").JsonValue | null;
            photos: import("@prisma/client/runtime/library").JsonValue | null;
            extras: import("@prisma/client/runtime/library").JsonValue | null;
            supplierSubType: string | null;
        };
    }>;
}
