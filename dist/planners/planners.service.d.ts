import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
export declare class PlannersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlanner(userId: string, createPlannerDto: CreatePlannerDto): Promise<{
        name: string;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
    }>;
    getPlannersByUser(userId: string): Promise<{
        name: string;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
    }[]>;
    getPlannerById(id: string, userId: string, includeItems?: boolean): Promise<{
        name: string;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
    }>;
    updatePlanner(id: string, userId: string, updatePlannerDto: UpdatePlannerDto): Promise<{
        name: string;
        createdAt: Date;
        id: string;
        userId: string;
        updatedAt: Date;
        destination: string | null;
        startDate: Date | null;
        endDate: Date | null;
        status: import(".prisma/client").$Enums.PlannerStatus;
        totalMXN: number;
        totalAxo: number;
        isPublic: boolean;
        shareCode: string | null;
    }>;
    deletePlanner(id: string, userId: string): Promise<{
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, userId: string): Promise<{
        createdAt: Date;
        priceAxo: number | null;
        id: string;
        serviceId: number | null;
        quantity: number;
        priceMXN: number;
        selectedDate: Date | null;
        notes: string | null;
        plannerId: string;
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
