import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
export declare class PlannersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlanner(userId: string, createPlannerDto: CreatePlannerDto): Promise<{
        id: string;
        name: string;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getPlannersByUser(userId: string): Promise<{
        id: string;
        name: string;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    getPlannerById(id: string, userId: string, includeItems?: boolean): Promise<{
        id: string;
        name: string;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    updatePlanner(id: string, userId: string, updatePlannerDto: UpdatePlannerDto): Promise<{
        id: string;
        name: string;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    deletePlanner(id: string, userId: string): Promise<{
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        priceMXN: number;
        priceAxo: number | null;
        selectedDate: Date | null;
        notes: string | null;
        plannerId: string;
        serviceId: number | null;
        productId: number | null;
    }>;
    removeItemFromPlanner(itemId: string, userId: string): Promise<{
        message: string;
    }>;
    private updatePlannerTotals;
    getPlannerStats(id: string, userId: string): Promise<{
        totalItems: any;
        totalMXN: number;
        totalAxo: number;
        daysPlanned: number;
        itemsByDate: {
            date: string;
            items: any;
        }[];
    }>;
}
