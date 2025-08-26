import { Test, TestingModule } from '@nestjs/testing';
import { SuppliersService } from './suppliers.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { SupplierApprovalAction } from './dto/supplier-approval.dto';

describe('SuppliersService', () => {
  let service: SuppliersService;
  let prisma: PrismaService;
  let notificationsService: NotificationsService;

  const mockPrismaService = {
    suppliers: {
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
    services: {
      count: jest.fn(),
    },
    users: {
      count: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
    },
  };

  const mockNotificationsService = {
    create: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuppliersService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: NotificationsService, useValue: mockNotificationsService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
    prisma = module.get<PrismaService>(PrismaService);
    notificationsService = module.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('approveOrDeclineSupplier', () => {
    it('should approve a supplier, change user role, and send notifications', async () => {
      const supplierId = 1;
      const userId = 10;
      const supplier = { id: supplierId, users: [{ id: userId }], extras: {} };
      mockPrismaService.suppliers.findUnique.mockResolvedValue(supplier);
      mockPrismaService.suppliers.update.mockResolvedValue({});
      mockPrismaService.users.update.mockResolvedValue({});

      const result = await service.approveOrDeclineSupplier(supplierId, {
        userId: String(userId),
        action: SupplierApprovalAction.APPROVE,
      });

      expect(result).toEqual({ success: true });
      expect(prisma.suppliers.update).toHaveBeenCalledWith({
        where: { id: supplierId },
        data: { extras: { isApproved: true, isPending: false } },
      });
      expect(prisma.users.update).toHaveBeenCalledWith({ where: { id: userId }, data: { role: 'admin' } });
      expect(notificationsService.create).toHaveBeenCalledTimes(2);
    });

    it('should decline a supplier and send a notification', async () => {
        const supplierId = 1;
        const userId = 10;
        const supplier = { id: supplierId, users: [{ id: userId }], extras: {} };
        mockPrismaService.suppliers.findUnique.mockResolvedValue(supplier);
  
        const result = await service.approveOrDeclineSupplier(supplierId, {
          userId: String(userId),
          action: SupplierApprovalAction.DECLINE,
        });
  
        expect(result).toEqual({ success: true });
        expect(prisma.suppliers.update).toHaveBeenCalledWith({
          where: { id: supplierId },
          data: { extras: { isApproved: false, isPending: false } },
        });
        expect(notificationsService.create).toHaveBeenCalledTimes(1);
      });
  });

  describe('getSupplierStats', () => {
    it('should return supplier statistics', async () => {
      mockPrismaService.suppliers.count.mockResolvedValue(10);
      mockPrismaService.services.count.mockResolvedValue(20);
      mockPrismaService.users.count.mockResolvedValue(5);

      const stats = await service.getSupplierStats();

      expect(stats).toEqual({
        totalSuppliers: 10,
        totalServices: 20,
        totalSupplierUsers: 5,
        totalHotelServices: 20,
        totalTransportServices: 20,
      });
    });
  });

  describe('create', () => {
    it('should create a supplier', async () => {
      const dto = { name: 'Test Supplier', contactEmail: 'test@example.com' };
      mockPrismaService.suppliers.findFirst.mockResolvedValue(null);
      mockPrismaService.users.findFirst.mockResolvedValue({id: 1});
      mockPrismaService.suppliers.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(result).toBeDefined();
      expect(prisma.suppliers.create).toHaveBeenCalled();
    });

    it('should throw a conflict exception if supplier name already exists', async () => {
        const dto = { name: 'Test Supplier', contactEmail: 'test@example.com' };
        mockPrismaService.suppliers.findFirst.mockResolvedValue({ id: 1, ...dto });
  
        await expect(service.create(dto)).rejects.toThrow(ConflictException);
      });
  });

  describe('findAll', () => {
    it('should return all suppliers', async () => {
      const suppliers = [{id: 1, name: 'test'}];
      mockPrismaService.suppliers.findMany.mockResolvedValue(suppliers);
      const result = await service.findAll();
      expect(result).toEqual(suppliers);
    });
  });

  describe('findOne', () => {
    it('should return a supplier', async () => {
      const supplier = {id: 1, name: 'test'};
      mockPrismaService.suppliers.findUnique.mockResolvedValue(supplier);
      const result = await service.findOne(1);
      expect(result).toEqual(supplier);
    });

    it('should throw not found exception', async () => {
      mockPrismaService.suppliers.findUnique.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(Error);
    });
  });

  describe('update', () => {
    it('should update a supplier', async () => {
      const supplier = {id: 1, name: 'test'};
      mockPrismaService.suppliers.update.mockResolvedValue(supplier);
      const result = await service.update(1, {name: 'test'});
      expect(result).toEqual(supplier);
    });
  });

  describe('remove', () => {
    it('should remove a supplier with no dependencies', async () => {
      const supplier = {
        id: 1,
        name: 'Test Supplier',
        services: [],
        users: [],
        transportServices: [],
        hotelServices: [],
      };
      mockPrismaService.suppliers.findUnique.mockResolvedValue(supplier);
      mockPrismaService.suppliers.delete.mockResolvedValue(supplier);

      const result = await service.remove(1);

      expect(result.success).toBe(true);
      expect(prisma.suppliers.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw a conflict exception if supplier has dependencies', async () => {
        const supplier = {
          id: 1,
          name: 'Test Supplier',
          services: [{id: 1}],
          users: [],
          transportServices: [],
          hotelServices: [],
        };
        mockPrismaService.suppliers.findUnique.mockResolvedValue(supplier);
  
        await expect(service.remove(1)).rejects.toThrow(ConflictException);
      });
  });
});
