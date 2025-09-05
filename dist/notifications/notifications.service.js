"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = class NotificationsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createNotificationDto) {
        return await this.prismaService.notification.create({
            data: Object.assign(Object.assign({}, createNotificationDto), { id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) }),
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
    }
    async findAll() {
        return this.prismaService.notification.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findByUserId(userId, includeRead = true) {
        return this.prismaService.notification.findMany({
            where: Object.assign({ userId }, (includeRead ? {} : { isRead: false })),
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async findOne(id) {
        const notification = await this.prismaService.notification.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification #${id} not found`);
        }
        return notification;
    }
    async update(id, updateNotificationDto) {
        await this.findOne(id);
        const updateData = Object.assign({}, updateNotificationDto);
        if (updateNotificationDto.isRead === true) {
            updateData.readAt = new Date();
        }
        return this.prismaService.notification.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
    }
    async markAsRead(id) {
        await this.findOne(id);
        return this.prismaService.notification.update({
            where: { id },
            data: {
                isRead: true,
                readAt: new Date()
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });
    }
    async markAllAsReadForUser(userId) {
        return this.prismaService.notification.updateMany({
            where: {
                userId,
                isRead: false
            },
            data: {
                isRead: true,
                readAt: new Date()
            }
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prismaService.notification.delete({
            where: { id }
        });
    }
    async removeReadNotificationsForUser(userId) {
        return this.prismaService.notification.deleteMany({
            where: {
                userId,
                isRead: true
            }
        });
    }
    async getNotificationStats(userId) {
        const stats = await this.prismaService.notification.aggregate({
            where: { userId },
            _count: {
                id: true
            }
        });
        const unreadCount = await this.prismaService.notification.count({
            where: {
                userId,
                isRead: false
            }
        });
        return {
            total: stats._count.id,
            unread: unreadCount,
            read: stats._count.id - unreadCount
        };
    }
    async createQuickNotification(userId, title, message, type = 'INFO') {
        return this.create({
            userId,
            title,
            message,
            type
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map