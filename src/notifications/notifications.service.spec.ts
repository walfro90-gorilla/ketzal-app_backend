import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto, NotificationType } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotFoundException } from '@nestjs/common';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    notification: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      updateMany: jest.fn(),
      deleteMany: jest.fn(),
      aggregate: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a notification', async () => {
      const dto: CreateNotificationDto = { userId: '1', title: 'Test', message: 'Test message', type: NotificationType.INFO };
      const notification = { id: '1', ...dto };
      mockPrismaService.notification.create.mockResolvedValue(notification);
      const result = await service.create(dto);
      expect(result).toEqual(notification);
    });
  });

  describe('findAll', () => {
    it('should return all notifications', async () => {
      const notifications = [{ id: '1', title: 'Test' }];
      mockPrismaService.notification.findMany.mockResolvedValue(notifications);
      const result = await service.findAll();
      expect(result).toEqual(notifications);
    });
  });

  describe('findByUserId', () => {
    it('should return notifications for a user', async () => {
      const notifications = [{ id: '1', title: 'Test' }];
      mockPrismaService.notification.findMany.mockResolvedValue(notifications);
      const result = await service.findByUserId('1');
      expect(result).toEqual(notifications);
    });
  });

  describe('findOne', () => {
    it('should return a notification', async () => {
      const notification = { id: '1', title: 'Test' };
      mockPrismaService.notification.findUnique.mockResolvedValue(notification);
      const result = await service.findOne('1');
      expect(result).toEqual(notification);
    });

    it('should throw not found exception', async () => {
      mockPrismaService.notification.findUnique.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a notification', async () => {
      const dto: UpdateNotificationDto = { isRead: true };
      const notification = { id: '1', ...dto };
      mockPrismaService.notification.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.notification.update.mockResolvedValue(notification);
      const result = await service.update('1', dto);
      expect(result).toEqual(notification);
    });
  });

  describe('markAsRead', () => {
    it('should mark a notification as read', async () => {
      const notification = { id: '1', isRead: true };
      mockPrismaService.notification.findUnique.mockResolvedValue({ id: '1' });
      mockPrismaService.notification.update.mockResolvedValue(notification);
      const result = await service.markAsRead('1');
      expect(result).toEqual(notification);
    });
  });

  describe('markAllAsReadForUser', () => {
    it('should mark all notifications as read for a user', async () => {
      await service.markAllAsReadForUser('1');
      expect(prisma.notifications.updateMany).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a notification', async () => {
      const notification = { id: '1' };
      mockPrismaService.notification.findUnique.mockResolvedValue(notification);
      mockPrismaService.notification.delete.mockResolvedValue(notification);
      const result = await service.remove('1');
      expect(result).toEqual(notification);
    });
  });

  describe('removeReadNotificationsForUser', () => {
    it('should remove read notifications for a user', async () => {
      await service.removeReadNotificationsForUser('1');
      expect(prisma.notification.deleteMany).toHaveBeenCalled();
    });
  });

  describe('getNotificationStats', () => {
    it('should return notification stats', async () => {
      mockPrismaService.notification.aggregate.mockResolvedValue({ _count: { id: 10 } });
      mockPrismaService.notification.count.mockResolvedValue(5);
      const result = await service.getNotificationStats('1');
      expect(result).toEqual({ total: 10, unread: 5, read: 5 });
    });
  });

  describe('createQuickNotification', () => {
    it('should create a quick notification', async () => {
      const notification = { id: '1' };
      mockPrismaService.notification.create.mockResolvedValue(notification);
      const result = await service.createQuickNotification('1', 'Test', 'Test message');
      expect(result).toEqual(notification);
    });
  });
});