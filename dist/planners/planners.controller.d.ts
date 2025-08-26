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
        data: any;
    }>;
    getUserPlanners(req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    getPlannerById(id: string, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    updatePlanner(id: string, updatePlannerDto: UpdatePlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    deletePlanner(id: string, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    addItemToPlanner(addItemDto: AddItemToPlannerDto, req: any): Promise<{
        success: boolean;
        message: string;
        data: any;
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
            totalMXN: any;
            totalAxo: any;
            daysPlanned: number;
            itemsByDate: {
                date: string;
                items: any;
                totalCost: any;
            }[];
        };
    }>;
}
