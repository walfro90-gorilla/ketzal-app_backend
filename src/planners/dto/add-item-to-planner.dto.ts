import { IsString, IsOptional, IsNumber, IsDateString, IsInt } from 'class-validator';

export class AddItemToPlannerDto {
  @IsString()
  readonly plannerId!: string;

  @IsInt()
  @IsOptional()
  readonly serviceId?: number;

  @IsInt()
  @IsOptional()
  readonly productId?: number;

  @IsInt()
  readonly quantity!: number;

  @IsNumber()
  readonly priceMXN!: number;

  @IsNumber()
  @IsOptional()
  readonly priceAxo?: number;

  @IsDateString()
  @IsOptional()
  readonly selectedDate?: string;

  @IsString()
  @IsOptional()
  readonly notes?: string;
}
