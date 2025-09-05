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
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    })[]>;
    findByUserId(userId: string, includeRead?: string): Promise<({
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
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
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    }>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    }>;
    markAsRead(id: string): Promise<{
        user: {
            id: string;
            name: string | null;
            email: string;
        };
    } & {
        id: string;
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    }>;
    markAllAsReadForUser(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
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
        title: string;
        message: string;
        type: string;
        isRead: boolean;
        priority: string;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        actionUrl: string | null;
        createdAt: Date;
        readAt: Date | null;
        userId: string;
    }>;
}
