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
        name: string;
        description: string | null;
        createdAt: Date;
        id: number;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
    }>;
    findAll(pending?: string): Promise<any[]>;
    checkDuplicate(name?: string, email?: string, excludeId?: string): Promise<{
        nameExists: boolean;
        emailExists: boolean;
        existingSuppliers: any[];
    }>;
    search(name?: string, email?: string): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        contactEmail: string;
    }[]>;
    checkDependencies(id: string): Promise<{
        supplier: {
            id: number;
            name: string;
        };
        services: any;
        users: any;
        transportServices: any;
        hotelServices: any;
        canDelete: boolean;
        totalDependencies: any;
    }>;
    findOne(id: string): Promise<{
        info: import("@prisma/client/runtime/library").JsonValue | null;
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        id: number;
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
        name: string;
        description: string | null;
        location: import("@prisma/client/runtime/library").JsonValue | null;
        createdAt: Date;
        id: number;
        contactEmail: string;
        phoneNumber: string | null;
        address: string | null;
        imgLogo: string | null;
        supplierType: string | null;
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
            name: string;
            description: string | null;
            location: import("@prisma/client/runtime/library").JsonValue | null;
            createdAt: Date;
            id: number;
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
