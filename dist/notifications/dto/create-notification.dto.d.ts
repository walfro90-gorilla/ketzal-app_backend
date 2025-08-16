export declare enum NotificationType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR",
    SUPPLIER_APPROVAL = "SUPPLIER_APPROVAL",
    BOOKING_UPDATE = "BOOKING_UPDATE",
    SYSTEM_UPDATE = "SYSTEM_UPDATE",
    USER_REGISTRATION = "USER_REGISTRATION",
    WELCOME_BONUS = "WELCOME_BONUS",
    WELCOME_MESSAGE = "WELCOME_MESSAGE"
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
