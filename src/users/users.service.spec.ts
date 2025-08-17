import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prismaMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  supplier: {
    findFirst: jest.fn(),
  },
};

const notificationsServiceMock = {
  create: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;
  let notificationsService: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: NotificationsService, useValue: notificationsServiceMock },
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
      const createUserDto = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const expectedUser = { id: '1', ...createUserDto, createdAt: new Date(), updatedAt: new Date(), emailVerified: null, role: 'user', extras: {} };
      prismaMock.user.create.mockResolvedValue(expectedUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(prismaMock.user.create).toHaveBeenCalledWith({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });
    });

    it('should throw a ConflictException if email already exists', async () => {
      const createUserDto = { name: 'Test User', email: 'test@example.com', password: 'password' };
      const error = new PrismaClientKnownRequestError('User with email already exists', {
        code: 'P2002',
        clientVersion: ''
      });
      prismaMock.user.create.mockRejectedValue(error);

      await expect(service.create(createUserDto)).rejects.toThrow(
        new ConflictException(`User with email ${createUserDto.email} already exists`),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ id: '1', name: 'Test User', email: 'test@example.com' }];
      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              contactEmail: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: '1', name: 'Test User', email: 'test@example.com' };
      prismaMock.user.findUnique.mockResolvedValue(user);

      const result = await service.findOne('1');
      expect(result).toEqual(user);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { supplier: { select: { id: true, name: true, contactEmail: true } } },
      });
    });

    it('should throw a NotFoundException if user not found', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);
      await expect(service.findOne('1')).rejects.toThrow(new NotFoundException('User with id 1 not found'));
    });
  });

  describe('update', () => {
    const userId = '1';
    const updateUserDto = { name: 'Updated Name' };
    const prevUser = { id: userId, name: 'Old Name', emailVerified: null };
    const updatedUser = { id: userId, name: 'Updated Name', emailVerified: new Date() };

    it('should update a user successfully', async () => {
      prismaMock.user.findUnique.mockResolvedValue(prevUser);
      prismaMock.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: updateUserDto,
      });
    });

    it('should send notifications when email is verified', async () => {
        prismaMock.user.findUnique.mockResolvedValue(prevUser);
        prismaMock.user.update.mockResolvedValue(updatedUser);
        const supplier = { id: 's1', name: 'Test Supplier' };
        prismaMock.supplier.findFirst.mockResolvedValue(supplier);
        const superadmins = [{ id: 'sa1' }, { id: 'sa2' }];
        prismaMock.user.findMany.mockResolvedValue(superadmins);
  
        await service.update(userId, { emailVerified: new Date() });
  
        // Check user notifications
        expect(notificationsServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({ userId: userId, title: '¡Solicitud enviada!' }));
        expect(notificationsServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({ userId: userId, title: 'Tu proveedor está en revisión' }));
        
        // Check superadmin notifications
        expect(notificationsServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({ userId: 'sa1', title: 'Nueva Solicitud de Proveedor Turístico' }));
        expect(notificationsServiceMock.create).toHaveBeenCalledWith(expect.objectContaining({ userId: 'sa2', title: 'Nueva Solicitud de Proveedor Turístico' }));
        expect(notificationsServiceMock.create).toHaveBeenCalledTimes(4); // 2 for user, 2 for superadmins
      });

    it('should throw a NotFoundException if user to update is not found', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null); // Simulate user not found before update
        prismaMock.user.update.mockResolvedValue(null); // or update returns null
  
        await expect(service.update(userId, updateUserDto)).rejects.toThrow(new NotFoundException(`User with id ${userId} not found`));
      });
  });

  describe('remove', () => {
    it('should remove a user successfully', async () => {
      const user = { id: '1' };
      prismaMock.user.delete.mockResolvedValue(user);

      const result = await service.remove('1');
      expect(result).toEqual(user);
      expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should throw a NotFoundException if user to remove is not found', async () => {
      const error = new PrismaClientKnownRequestError('User not found', {
        code: 'P2025',
        clientVersion: ''
      });
      prismaMock.user.delete.mockRejectedValue(error);
      await expect(service.remove('1')).rejects.toThrow(new NotFoundException('User with id 1 not found'));
    });
  });

  describe('searchUsers', () => {
    it('should return users matching the name', async () => {
      const users = [{ id: '1', name: 'Test User', email: 'test@example.com' }];
      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.searchUsers('Test');
      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          OR: [{
            name: {
              contains: 'Test',
              mode: 'insensitive'
            }
          }]
        }
      }));
    });

    it('should return users matching the email', async () => {
      const users = [{ id: '1', name: 'Test User', email: 'test@example.com' }];
      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.searchUsers(undefined, 'test@');
      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          OR: [{
            email: {
              contains: 'test@',
              mode: 'insensitive'
            }
          }]
        }
      }));
    });

    it('should return users matching the name or email', async () => {
      const users = [{ id: '1', name: 'Test User', email: 'another@example.com' }];
      prismaMock.user.findMany.mockResolvedValue(users);

      const result = await service.searchUsers('Test', 'another@');
      expect(result).toEqual(users);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          OR: [
            { name: { contains: 'Test', mode: 'insensitive' } },
            { email: { contains: 'another@', mode: 'insensitive' } }
          ]
        }
      }));
    });
  });
});