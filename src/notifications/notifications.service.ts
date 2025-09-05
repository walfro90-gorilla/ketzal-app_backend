import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prismaService: PrismaService) {}

  // CREATE - Crear notificación
  async create(createNotificationDto: CreateNotificationDto) {
    return await this.prismaService.notification.create({
      data: {
        ...createNotificationDto,
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });
  }

  // READ - Obtener todas las notificaciones
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

  // READ - Obtener notificaciones por usuario
  async findByUserId(userId: string, includeRead: boolean = true) {
    return this.prismaService.notification.findMany({
      where: {
        userId,
        ...(includeRead ? {} : { isRead: false })
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // READ - Obtener una notificación por ID
  async findOne(id: string) {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!notification) {
      throw new NotFoundException(`Notification #${id} not found`);
    }

    return notification;
  }

  // UPDATE - Actualizar notificación
  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    // Verificar que existe
    await this.findOne(id);

    const updateData: any = { ...updateNotificationDto };

    // Si marca como leída, agregar timestamp
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

  // UPDATE - Marcar una notificación como leída
  async markAsRead(id: string) {
    // Verificar que existe
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

  // UPDATE - Marcar todas como leídas para un usuario
  async markAllAsReadForUser(userId: string) {
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

  // DELETE - Eliminar notificación
  async remove(id: string) {
    // Verificar que existe
    await this.findOne(id);

    return this.prismaService.notification.delete({
      where: { id }
    });
  }

  // DELETE - Eliminar todas las notificaciones leídas de un usuario
  async removeReadNotificationsForUser(userId: string) {
    return this.prismaService.notification.deleteMany({
      where: {
        userId,
        isRead: true
      }
    });
  }

  // STATS - Obtener estadísticas de notificaciones
  async getNotificationStats(userId: string) {
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

  // UTILITY - Crear notificación rápida
  async createQuickNotification(
    userId: string, 
    title: string, 
    message: string, 
    type: any = 'INFO'
  ) {
    return this.create({
      userId,
      title,
      message,
      type
    });
  }
}