import { IsString, IsOptional, IsDateString, IsNumber, IsEnum, IsBoolean } from 'class-validator';

export enum PlannerStatusDto {
  PLANNING = 'PLANNING',
  RESERVED = 'RESERVED', 
  CONFIRMED = 'CONFIRMED',
  TRAVELLING = 'TRAVELLING',
  COMPLETED = 'COMPLETED'
}

export class CreatePlannerDto {
  @IsString()
  readonly name!: string;

  @IsString()
  @IsOptional()
  readonly destination?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDateString()
  @IsOptional()
  readonly startDate?: string;

  @IsDateString()
  @IsOptional()
  readonly endDate?: string;

  @IsNumber()
  @IsOptional()
  readonly budget?: number;

  @IsNumber()
  @IsOptional()
  readonly travelers?: number;

  @IsEnum(PlannerStatusDto)
  @IsOptional()
  readonly status?: PlannerStatusDto;

  @IsBoolean()
  @IsOptional()
  readonly isPublic?: boolean;

  @IsString()
  @IsOptional()
  readonly shareCode?: string;
}
