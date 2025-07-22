export declare enum NotificationType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR",
    SUPPLIER_APPROVAL = "SUPPLIER_APPROVAL",
    BOOKING_UPDATE = "BOOKING_UPDATE",
    SYSTEM_UPDATE = "SYSTEM_UPDATE"
}
export declare enum NotificationPriority {
    LOW = "LOW",
    NORMAL = "NORMAL",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare class CreateNotificationDto {
    userId: string;
    title: string;
    message: string;
    type?: NotificationType;
    isRead?: boolean;
    priority?: NotificationPriority;
    metadata?: any;
    actionUrl?: string;
}
