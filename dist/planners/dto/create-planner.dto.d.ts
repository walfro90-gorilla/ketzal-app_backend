export declare enum PlannerStatusDto {
    PLANNING = "PLANNING",
    RESERVED = "RESERVED",
    CONFIRMED = "CONFIRMED",
    TRAVELLING = "TRAVELLING",
    COMPLETED = "COMPLETED"
}
export declare class CreatePlannerDto {
    readonly name: string;
    readonly destination?: string;
    readonly description?: string;
    readonly startDate?: string;
    readonly endDate?: string;
    readonly budget?: number;
    readonly travelers?: number;
    readonly status?: PlannerStatusDto;
    readonly isPublic?: boolean;
    readonly shareCode?: string;
}
