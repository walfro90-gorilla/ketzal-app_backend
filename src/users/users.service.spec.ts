import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NotificationType } from '../notifications/dto/create-notification.dto';

// Mock data and services
const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  password: 'password123',
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: null,
  role: 'user',
  customer_id: null,
  referralCode: 'ABCDE',
  referredById: null,
};

const mockSupplier = {
  id: 'sup-1',
  name: 'Test Supplier',
  extras: { isPending: true },
};

const mockSuperAdmin = {
  id: 'admin-1',
  role: 'superadmin',
  email: 'admin@ketzal.com',
  name: 'Admin',
};

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(mockUser),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Updated Name' }),
    findMany: jest.fn().mockResolvedValue([mockUser]),
  },
  supplier: {
    findFirst: jest.fn().mockResolvedValue(mockSupplier),
  },
};

const mockNotificationsService = {
  create: jest.fn(),
  createNotification: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: NotificationsService, useValue: mockNotificationsService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
    notificationsService = module.get<NotificationsService>(NotificationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };
      const result = await service.create(createUserDto);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw a ConflictException if the email already exists', async () => {
      const createUserDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };
      const prismaError = new Prisma.PrismaClientKnownRequestError(
        'User with this email already exists',
        { code: 'P2002', clientVersion: 'mock' },
      );
      (prisma.user.create as jest.Mock).mockRejectedValue(prismaError);
      await expect(service.create(createUserDto)).rejects.toThrow(
        new ConflictException(`User with email ${createUserDto.email} already exists`),
      );
    });
  });

  describe('findOne', () => {
    it('should return a user when a valid id is provided', async () => {
      const result = await service.findOne(mockUser.id);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        include: {
          supplier: {
            select: { id: true, name: true, contactEmail: true },
          },
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        new NotFoundException('User with id non-existent-id not found'),
      );
    });
  });

  describe('remove', () => {
    it('should delete a user successfully', async () => {
      const result = await service.remove(mockUser.id);
      expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: mockUser.id } });
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if the user to delete is not found', async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue(null);
      await expect(service.remove('non-existent-id')).rejects.toThrow(
        new NotFoundException('User with id non-existent-id not found'),
      );
    });
  });

  describe('update', () => {
    const updateUserDto = { name: 'Updated Name' };

    it('should update a user successfully', async () => {
      const result = await service.update(mockUser.id, updateUserDto);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: updateUserDto,
      });
      expect(result.name).toEqual('Updated Name');
    });

    it('should throw a NotFoundException if the user to update is not found', async () => {
      (prisma.user.update as jest.Mock).mockResolvedValue(null);
      await expect(service.update('non-existent-id', updateUserDto)).rejects.toThrow(
        new NotFoundException('User with id non-existent-id not found'),
      );
    });

    it('should send notifications when emailVerified changes and a pending supplier exists', async () => {
      const userBeforeUpdate = { ...mockUser, emailVerified: null };
      const userAfterUpdate = { ...mockUser, emailVerified: new Date() };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userBeforeUpdate);
      (prisma.user.update as jest.Mock).mockResolvedValue(userAfterUpdate);
      (prisma.supplier.findFirst as jest.Mock).mockResolvedValue(mockSupplier);
      (prisma.user.findMany as jest.Mock).mockResolvedValue([mockSuperAdmin]);

      await service.update(mockUser.id, { emailVerified: userAfterUpdate.emailVerified });

      expect(notificationsService.create).toHaveBeenCalledTimes(3);

      expect(notificationsService.create).toHaveBeenCalledWith({
        userId: mockUser.id,
        title: '¡Solicitud enviada!',
        message: `Tu solicitud para el supplier "${mockSupplier.name}" ha sido enviada y está pendiente de aprobación por el equipo de KetzaL.`, 
        type: NotificationType.INFO,
      });

      expect(notificationsService.create).toHaveBeenCalledWith({
        userId: mockUser.id,
        title: 'Tu proveedor está en revisión',
        message: `Tu solicitud para el supplier "${mockSupplier.name}" está en revisión. Te notificaremos dentro de 72 horas si fue aprobada o rechazada.`, 
        type: NotificationType.INFO,
      });

      expect(notificationsService.create).toHaveBeenCalledWith({
        userId: mockSuperAdmin.id,
        title: 'Nueva Solicitud de Proveedor Turístico',
        message: `${userAfterUpdate.name || userAfterUpdate.email} ha solicitado convertirse en proveedor de servicios turísticos (${mockSupplier.name}). Revisa y aprueba/rechaza la solicitud en el panel de administración.`, 
        type: NotificationType.SUPPLIER_APPROVAL,
      });
    });

    it('should NOT send notifications if emailVerified does not change', async () => {
      const userBeforeUpdate = { ...mockUser, emailVerified: new Date() };
      const userAfterUpdate = { ...mockUser, emailVerified: new Date(), name: 'Another Name' };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userBeforeUpdate);
      (prisma.user.update as jest.Mock).mockResolvedValue(userAfterUpdate);

      await service.update(mockUser.id, { name: 'Another Name' });

      expect(notificationsService.create).not.toHaveBeenCalled();
    });

    it('should NOT send notifications if no pending supplier is found', async () => {
      const userBeforeUpdate = { ...mockUser, emailVerified: null };
      const userAfterUpdate = { ...mockUser, emailVerified: new Date() };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userBeforeUpdate);
      (prisma.user.update as jest.Mock).mockResolvedValue(userAfterUpdate);
      (prisma.supplier.findFirst as jest.Mock).mockResolvedValue(null);

      await service.update(mockUser.id, { emailVerified: userAfterUpdate.emailVerified });

      expect(notificationsService.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsersArray = [mockUser, { ...mockUser, id: '2', email: 'test2@example.com' }];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsersArray);

      const result = await service.findAll();

      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockUsersArray);
    });
  });

  describe('searchUsers', () => {
    it('should return users matching the search criteria', async () => {
      const searchName = 'Test';
      const mockUsersArray = [mockUser];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsersArray);

      const result = await service.searchUsers(searchName);

      expect(prisma.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          OR: [{
            name: {
              contains: searchName,
              mode: 'insensitive'
            }
          }]
        }
      }));
      expect(result).toEqual(mockUsersArray);
    });

    it('should handle search with no criteria', async () => {
        (prisma.user.findMany as jest.Mock).mockResolvedValue([]);
        const result = await service.searchUsers();
        expect(prisma.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
            where: {}
        }));
        expect(result).toEqual([]);
    });
  });
});