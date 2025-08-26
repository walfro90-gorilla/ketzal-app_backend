import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): Promise<any>;
    findAll(): Promise<any>;
    findByUserId(userId: string, includeRead?: string): Promise<any>;
    getNotificationStats(userId: string): Promise<{
        total: any;
        unread: any;
        read: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, updateNotificationDto: UpdateNotificationDto): Promise<any>;
    markAsRead(id: string): Promise<any>;
    markAllAsReadForUser(userId: string): Promise<any>;
    remove(id: string): Promise<any>;
    removeReadNotificationsForUser(userId: string): Promise<any>;
    createQuickNotification(body: {
        userId: string;
        title: string;
        message: string;
        type?: string;
    }): Promise<any>;
}
