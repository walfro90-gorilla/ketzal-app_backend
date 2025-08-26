import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsService {
    private prismaService;
    constructor(prismaService: PrismaService);
    create(createNotificationDto: CreateNotificationDto): Promise<any>;
    findAll(): Promise<any>;
    findByUserId(userId: string, includeRead?: boolean): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<any>;
    markAsRead(id: string): Promise<any>;
    markAllAsReadForUser(userId: string): Promise<any>;
    remove(id: string): Promise<any>;
    removeReadNotificationsForUser(userId: string): Promise<any>;
    getNotificationStats(userId: string): Promise<{
        total: any;
        unread: any;
        read: number;
    }>;
    createQuickNotification(userId: string, title: string, message: string, type?: any): Promise<any>;
}
