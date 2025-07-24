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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const create_notification_dto_1 = require("../notifications/dto/create-notification.dto");
const library_1 = require("@prisma/client/runtime/library");
let UsersService = class UsersService {
    constructor(prismaService, notificationsService) {
        this.prismaService = prismaService;
        this.notificationsService = notificationsService;
    }
    async create(createUserDto) {
        try {
            return await this.prismaService.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: createUserDto.password,
                }
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                const prismaError = error;
                if (prismaError.code === 'P2002') {
                    throw new common_1.ConflictException(`User with email ${createUserDto.email} already exists`);
                }
            }
        }
    }
    findAll() {
        return this.prismaService.user.findMany({
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
    }
    async findOne(id) {
        const userFound = await this.prismaService.user.findUnique({
            where: { id: id },
            include: {
                supplier: {
                    select: {
                        id: true,
                        name: true,
                        contactEmail: true
                    }
                }
            }
        });
        if (!userFound) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return userFound;
    }
    async update(id, updateUserDto) {
        const prevUser = await this.prismaService.user.findUnique({ where: { id } });
        const userFound = await this.prismaService.user.update({
            where: { id: id },
            data: updateUserDto
        });
        if (!userFound) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        if (prevUser &&
            (!prevUser.emailVerified || prevUser.emailVerified === null) &&
            userFound.emailVerified) {
            const supplier = await this.prismaService.supplier.findFirst({
                where: {
                    users: { some: { id } },
                    OR: [
                        { extras: { equals: { isPending: true } } },
                    ]
                }
            });
            if (supplier) {
                await this.notificationsService.create({
                    userId: id,
                    title: '¡Solicitud enviada!',
                    message: `Tu solicitud para el supplier "${supplier.name}" ha sido enviada y está pendiente de aprobación por el equipo de KetzaL.`,
                    type: create_notification_dto_1.NotificationType.INFO,
                });
                await this.notificationsService.create({
                    userId: id,
                    title: 'Tu proveedor está en revisión',
                    message: `Tu solicitud para el supplier "${supplier.name}" está en revisión. Te notificaremos dentro de 72 horas si fue aprobada o rechazada.`,
                    type: create_notification_dto_1.NotificationType.INFO,
                });
                const superadmins = await this.prismaService.user.findMany({ where: { role: 'superadmin' } });
                for (const superadmin of superadmins) {
                    await this.notificationsService.create({
                        userId: superadmin.id,
                        title: 'Nueva Solicitud de Proveedor Turístico',
                        message: `${userFound.name || userFound.email} ha solicitado convertirse en proveedor de servicios turísticos (${supplier.name}). Revisa y aprueba/rechaza la solicitud en el panel de administración.`,
                        type: create_notification_dto_1.NotificationType.SUPPLIER_APPROVAL,
                    });
                }
            }
        }
        return userFound;
    }
    async remove(id) {
        const deletedUser = await this.prismaService.user.delete({
            where: {
                id: id
            }
        });
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return deletedUser;
    }
    async searchUsers(name, email) {
        const where = {};
        if (name || email) {
            where.OR = [];
            if (name) {
                where.OR.push({
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                });
            }
            if (email) {
                where.OR.push({
                    email: {
                        contains: email,
                        mode: 'insensitive'
                    }
                });
            }
        }
        return this.prismaService.user.findMany({
            where,
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
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => notifications_service_1.NotificationsService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], UsersService);
//# sourceMappingURL=users.service.js.map