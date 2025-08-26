import { PrismaService } from '../prisma/prisma.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
export declare class PlannersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createPlanner(userId: string, createPlannerDto: CreatePlannerDto): Promise<any>;
    getPlannersByUser(userId: string): Promise<any>;
    getPlannerById(id: string, userId: string): Promise<any>;
    updatePlanner(id: string, userId: string, updatePlannerDto: UpdatePlannerDto): Promise<any>;
    deletePlanner(id: string, userId: string): Promise<{
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, userId: string): Promise<any>;
    removeItemFromPlanner(itemId: string, userId: string): Promise<{
        message: string;
    }>;
    private updatePlannerTotals;
    getPlannerStats(id: string, userId: string): Promise<{
        totalItems: any;
        totalMXN: any;
        totalAxo: any;
        daysPlanned: number;
        itemsByDate: {
            date: string;
            items: any;
            totalCost: any;
        }[];
    }>;
}
