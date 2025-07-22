import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum NotificationType {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUPPLIER_APPROVAL = 'SUPPLIER_APPROVAL',
  BOOKING_UPDATE = 'BOOKING_UPDATE',
  SYSTEM_UPDATE = 'SYSTEM_UPDATE'
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty()
  @IsString()
  message!: string;

  @ApiProperty({ enum: NotificationType, default: NotificationType.INFO })
  @IsEnum(NotificationType)
  @IsOptional()
  type?: NotificationType = NotificationType.INFO;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean = false;

  @ApiProperty({ enum: NotificationPriority, default: NotificationPriority.NORMAL })
  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority = NotificationPriority.NORMAL;

  @ApiProperty({ required: false })
  @IsOptional()
  metadata?: any;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  actionUrl?: string;
}
