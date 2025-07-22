import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
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
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
    })[]>;
    findByUserId(userId: string, includeRead?: string): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
    })[]>;
    getNotificationStats(userId: string): Promise<{
        total: number;
        unread: number;
        read: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
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
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
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
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
    }>;
    markAllAsReadForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
    }>;
    removeReadNotificationsForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    createQuickNotification(body: {
        userId: string;
        title: string;
        message: string;
        type?: string;
    }): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        priority: import(".prisma/client").$Enums.NotificationPriority;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
    }>;
}
