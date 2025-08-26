import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierApprovalDto } from './dto/supplier-approval.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
export declare class SuppliersService {
    private prismaService;
    private notificationsService;
    private usersService;
    constructor(prismaService: PrismaService, notificationsService: NotificationsService, usersService: UsersService);
    approveOrDeclineSupplier(supplierId: number, dto: SupplierApprovalDto): Promise<{
        success: boolean;
    }>;
    getSupplierStats(): Promise<{
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
    findOne(id: number): Promise<{
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
    update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<{
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
    remove(id: number): Promise<{
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
    softDelete(id: number): Promise<{
        success: boolean;
        message: string;
        supplier: {
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
    checkDuplicate(name?: string, email?: string, excludeId?: number): Promise<{
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
    checkDependencies(id: number): Promise<{
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
}
