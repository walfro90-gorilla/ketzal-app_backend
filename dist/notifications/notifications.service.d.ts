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
    findByUserId(userId: string, includeRead?: boolean): Promise<({
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
