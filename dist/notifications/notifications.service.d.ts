import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    })[]>;
    findByUserId(userId: string, includeRead?: boolean): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
    markAsRead(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
    markAllAsReadForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
    removeReadNotificationsForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getNotificationStats(userId: string): Promise<{
        total: number;
        unread: number;
        read: number;
    }>;
    createQuickNotification(userId: string, title: string, message: string, type?: any): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        title: string;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        readAt: Date | null;
    }>;
}
