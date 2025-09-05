import { PlannersService } from './planners.service';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { AddItemToPlannerDto } from './dto/add-item-to-planner.dto';
export declare class PlannersController {
    private readonly plannersService;
    constructor(plannersService: PlannersService);
    createPlanner(createPlannerDto: CreatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    getUserPlanners(req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        }[];
    }>;
    getPlannerById(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    updatePlanner(id: string, updatePlannerDto: UpdatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    deletePlanner(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    removeItemFromPlanner(itemId: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getPlannerStats(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: {
            totalItems: any;
            totalMXN: number;
            totalAxo: number;
            daysPlanned: number;
            itemsByDate: {
                date: string;
                items: any;
            }[];
        };
    }>;
}
