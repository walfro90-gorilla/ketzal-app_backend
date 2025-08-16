"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_service_1 = require("./users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const create_notification_dto_1 = require("../notifications/dto/create-notification.dto");
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
        update: jest.fn().mockResolvedValue(Object.assign(Object.assign({}, mockUser), { name: 'Updated Name' })),
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
    let service;
    let prisma;
    let notificationsService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
                { provide: notifications_service_1.NotificationsService, useValue: mockNotificationsService },
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
        prisma = module.get(prisma_service_1.PrismaService);
        notificationsService = module.get(notifications_service_1.NotificationsService);
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
            const prismaError = new client_1.Prisma.PrismaClientKnownRequestError('User with this email already exists', { code: 'P2002', clientVersion: 'mock' });
            prisma.user.create.mockRejectedValue(prismaError);
            await expect(service.create(createUserDto)).rejects.toThrow(new common_1.ConflictException(`User with email ${createUserDto.email} already exists`));
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
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(service.findOne('non-existent-id')).rejects.toThrow(new common_1.NotFoundException('User with id non-existent-id not found'));
        });
    });
    describe('remove', () => {
        it('should delete a user successfully', async () => {
            const result = await service.remove(mockUser.id);
            expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: mockUser.id } });
            expect(result).toEqual(mockUser);
        });
        it('should throw a NotFoundException if the user to delete is not found', async () => {
            prisma.user.delete.mockResolvedValue(null);
            await expect(service.remove('non-existent-id')).rejects.toThrow(new common_1.NotFoundException('User with id non-existent-id not found'));
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
            prisma.user.update.mockResolvedValue(null);
            await expect(service.update('non-existent-id', updateUserDto)).rejects.toThrow(new common_1.NotFoundException('User with id non-existent-id not found'));
        });
        it('should send notifications when emailVerified changes and a pending supplier exists', async () => {
            const userBeforeUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: null });
            const userAfterUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: new Date() });
            prisma.user.findUnique.mockResolvedValue(userBeforeUpdate);
            prisma.user.update.mockResolvedValue(userAfterUpdate);
            prisma.supplier.findFirst.mockResolvedValue(mockSupplier);
            prisma.user.findMany.mockResolvedValue([mockSuperAdmin]);
            await service.update(mockUser.id, { emailVerified: userAfterUpdate.emailVerified });
            expect(notificationsService.create).toHaveBeenCalledTimes(3);
            expect(notificationsService.create).toHaveBeenCalledWith({
                userId: mockUser.id,
                title: '¡Solicitud enviada!',
                message: `Tu solicitud para el supplier "${mockSupplier.name}" ha sido enviada y está pendiente de aprobación por el equipo de KetzaL.`,
                type: create_notification_dto_1.NotificationType.INFO,
            });
            expect(notificationsService.create).toHaveBeenCalledWith({
                userId: mockUser.id,
                title: 'Tu proveedor está en revisión',
                message: `Tu solicitud para el supplier "${mockSupplier.name}" está en revisión. Te notificaremos dentro de 72 horas si fue aprobada o rechazada.`,
                type: create_notification_dto_1.NotificationType.INFO,
            });
            expect(notificationsService.create).toHaveBeenCalledWith({
                userId: mockSuperAdmin.id,
                title: 'Nueva Solicitud de Proveedor Turístico',
                message: `${userAfterUpdate.name || userAfterUpdate.email} ha solicitado convertirse en proveedor de servicios turísticos (${mockSupplier.name}). Revisa y aprueba/rechaza la solicitud en el panel de administración.`,
                type: create_notification_dto_1.NotificationType.SUPPLIER_APPROVAL,
            });
        });
        it('should NOT send notifications if emailVerified does not change', async () => {
            const userBeforeUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: new Date() });
            const userAfterUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: new Date(), name: 'Another Name' });
            prisma.user.findUnique.mockResolvedValue(userBeforeUpdate);
            prisma.user.update.mockResolvedValue(userAfterUpdate);
            await service.update(mockUser.id, { name: 'Another Name' });
            expect(notificationsService.create).not.toHaveBeenCalled();
        });
        it('should NOT send notifications if no pending supplier is found', async () => {
            const userBeforeUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: null });
            const userAfterUpdate = Object.assign(Object.assign({}, mockUser), { emailVerified: new Date() });
            prisma.user.findUnique.mockResolvedValue(userBeforeUpdate);
            prisma.user.update.mockResolvedValue(userAfterUpdate);
            prisma.supplier.findFirst.mockResolvedValue(null);
            await service.update(mockUser.id, { emailVerified: userAfterUpdate.emailVerified });
            expect(notificationsService.create).not.toHaveBeenCalled();
        });
    });
    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUsersArray = [mockUser, Object.assign(Object.assign({}, mockUser), { id: '2', email: 'test2@example.com' })];
            prisma.user.findMany.mockResolvedValue(mockUsersArray);
            const result = await service.findAll();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(result).toEqual(mockUsersArray);
        });
    });
    describe('searchUsers', () => {
        it('should return users matching the search criteria', async () => {
            const searchName = 'Test';
            const mockUsersArray = [mockUser];
            prisma.user.findMany.mockResolvedValue(mockUsersArray);
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
            prisma.user.findMany.mockResolvedValue([]);
            const result = await service.searchUsers();
            expect(prisma.user.findMany).toHaveBeenCalledWith(expect.objectContaining({
                where: {}
            }));
            expect(result).toEqual([]);
        });
    });
});
//# sourceMappingURL=users.service.spec.js.map