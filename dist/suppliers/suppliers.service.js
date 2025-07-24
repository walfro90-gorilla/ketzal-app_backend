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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const supplier_approval_dto_1 = require("./dto/supplier-approval.dto");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
const create_notification_dto_1 = require("../notifications/dto/create-notification.dto");
let SuppliersService = class SuppliersService {
    constructor(prismaService, notificationsService, usersService) {
        this.prismaService = prismaService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
    }
    async approveOrDeclineSupplier(supplierId, dto) {
        const supplier = await this.prismaService.supplier.findUnique({
            where: { id: supplierId },
            include: { users: true },
        });
        console.log('DEBUG supplier:', JSON.stringify(supplier, null, 2));
        if (!supplier)
            throw new Error('Supplier not found');
        console.log('DEBUG dto.userId:', dto.userId, 'type:', typeof dto.userId);
        console.log('DEBUG supplier.users ids:', supplier.users.map(u => u.id));
        const user = supplier.users.find(u => String(u.id) === String(dto.userId));
        if (!user) {
            console.log('DEBUG comparación fallida: buscando', dto.userId, 'en', supplier.users.map(u => u.id));
            throw new Error('User not found for this supplier');
        }
        let newExtras = {};
        if (typeof supplier.extras === 'string') {
            try {
                newExtras = JSON.parse(supplier.extras);
            }
            catch (_a) {
                newExtras = {};
            }
        }
        else if (typeof supplier.extras === 'object' && supplier.extras !== null) {
            newExtras = Object.assign({}, supplier.extras);
        }
        if (dto.action === supplier_approval_dto_1.SupplierApprovalAction.APPROVE) {
            newExtras.isApproved = true;
            newExtras.isPending = false;
        }
        else {
            newExtras.isApproved = false;
            newExtras.isPending = false;
        }
        await this.prismaService.supplier.update({
            where: { id: supplierId },
            data: { extras: newExtras },
        });
        const notifType = create_notification_dto_1.NotificationType.SUPPLIER_APPROVAL;
        const notifTitle = dto.action === supplier_approval_dto_1.SupplierApprovalAction.APPROVE ? '¡Tu proveedor ha sido aprobado!' : 'Tu proveedor ha sido rechazado';
        const notifMsg = dto.action === supplier_approval_dto_1.SupplierApprovalAction.APPROVE
            ? '¡Felicidades! Tu proveedor fue aprobado por el equipo de KetzaL.'
            : 'Lamentablemente tu proveedor fue rechazado. Puedes revisar y volver a intentarlo.';
        await this.notificationsService.create({
            userId: user.id,
            title: notifTitle,
            message: notifMsg,
            type: notifType,
        });
        if (dto.action === supplier_approval_dto_1.SupplierApprovalAction.APPROVE) {
            await this.prismaService.user.update({ where: { id: user.id }, data: { role: 'admin' } });
            await this.notificationsService.create({
                userId: user.id,
                title: '¡Ahora eres administrador!',
                message: 'Tu cuenta ha sido actualizada a nivel administrador por la aprobación de tu proveedor.',
                type: create_notification_dto_1.NotificationType.SUCCESS,
            });
        }
        return { success: true };
    }
    async getSupplierStats() {
        const totalSuppliers = await this.prismaService.supplier.count();
        const totalServices = await this.prismaService.service.count();
        const totalSupplierUsers = await this.prismaService.user.count({ where: { supplierId: { not: null } } });
        const totalHotelServices = await this.prismaService.service.count({ where: { serviceCategory: 'hotel' } });
        const totalTransportServices = await this.prismaService.service.count({ where: { serviceCategory: 'transport' } });
        return {
            totalSuppliers,
            totalServices,
            totalSupplierUsers,
            totalHotelServices,
            totalTransportServices,
        };
    }
    async create(createSupplierDto) {
        var _a;
        try {
            console.log('=== SUPPLIER CREATION ATTEMPT ===');
            console.log('Received data:', JSON.stringify(createSupplierDto, null, 2));
            const existingByName = await this.prismaService.supplier.findFirst({
                where: {
                    name: {
                        equals: createSupplierDto.name
                    }
                }
            });
            if (existingByName) {
                console.log('Found existing supplier by name:', existingByName);
                throw new common_1.ConflictException(`Supplier with name "${createSupplierDto.name}" already exists`);
            }
            const existingByEmail = await this.prismaService.supplier.findFirst({
                where: {
                    contactEmail: {
                        equals: createSupplierDto.contactEmail
                    }
                }
            });
            if (existingByEmail) {
                console.log('Found existing supplier by email:', existingByEmail);
                throw new common_1.ConflictException(`Supplier with email "${createSupplierDto.contactEmail}" already exists`);
            }
            console.log('No existing suppliers found, proceeding with creation...');
            const cleanData = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ name: createSupplierDto.name.trim(), contactEmail: createSupplierDto.contactEmail.trim().toLowerCase() }, (createSupplierDto.phoneNumber && { phoneNumber: createSupplierDto.phoneNumber.trim() })), (createSupplierDto.address && { address: createSupplierDto.address.trim() })), (createSupplierDto.description && { description: createSupplierDto.description.trim() })), (createSupplierDto.type && { supplierType: createSupplierDto.type.trim() })), (createSupplierDto.imgLogo && { imgLogo: createSupplierDto.imgLogo.trim() }));
            console.log('Clean data for creation:', JSON.stringify(cleanData, null, 2));
            const newSupplier = await this.prismaService.supplier.create({
                data: cleanData,
                select: {
                    id: true,
                    name: true,
                    contactEmail: true,
                    phoneNumber: true,
                    address: true,
                    description: true,
                    supplierType: true,
                    imgLogo: true,
                    createdAt: true,
                }
            });
            console.log('Successfully created supplier:', newSupplier);
            return newSupplier;
        }
        catch (error) {
            console.log('=== ERROR IN SUPPLIER CREATION ===');
            if (typeof error === 'object' && error !== null && 'constructor' in error) {
                console.log('Error type:', error.constructor.name);
            }
            else {
                console.log('Error type: unknown');
            }
            console.log('Error message:', error === null || error === void 0 ? void 0 : error.message);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                const prismaError = error;
                console.log('Prisma error code:', prismaError.code);
                console.log('Prisma error meta:', prismaError.meta);
                if (prismaError.code === 'P2002') {
                    const target = (_a = prismaError.meta) === null || _a === void 0 ? void 0 : _a.target;
                    console.log('Unique constraint violation on fields:', target);
                    if (target && target.includes('name')) {
                        throw new common_1.ConflictException(`Supplier with name "${createSupplierDto.name}" already exists`);
                    }
                    else if (target && target.includes('contactEmail')) {
                        throw new common_1.ConflictException(`Supplier with email "${createSupplierDto.contactEmail}" already exists`);
                    }
                    else {
                        throw new common_1.ConflictException(`Supplier with this information already exists. Constraint violated on: ${target === null || target === void 0 ? void 0 : target.join(', ')}`);
                    }
                }
            }
            console.error('Unexpected error creating supplier:', error);
            throw error;
        }
    }
    async findAll(pending) {
        const allSuppliers = await this.prismaService.supplier.findMany({ include: { users: true } });
        if (pending === 'true') {
            return allSuppliers
                .filter(s => {
                let extras = s.extras;
                if (typeof extras === 'string') {
                    try {
                        extras = JSON.parse(extras);
                    }
                    catch (_a) {
                        extras = {};
                    }
                }
                if (typeof extras === 'object' && extras !== null && 'isPending' in extras) {
                    return extras.isPending === true;
                }
                return false;
            })
                .map(s => (Object.assign(Object.assign({}, s), { supplierId: s.id, user: s.users && s.users.length > 0 ? s.users[0] : null })));
        }
        return allSuppliers;
    }
    async search(name, email) {
        const where = {};
        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive'
            };
        }
        if (email) {
            where.contactEmail = {
                contains: email,
                mode: 'insensitive'
            };
        }
        const suppliers = await this.prismaService.supplier.findMany({
            where,
            select: {
                id: true,
                name: true,
                contactEmail: true,
                createdAt: true
            }
        });
        console.log(`Search results for name="${name}", email="${email}":`, suppliers);
        return suppliers;
    }
    async checkDuplicate(name, email, excludeId) {
        const result = {
            nameExists: false,
            emailExists: false,
            existingSuppliers: []
        };
        if (name) {
            const nameExists = await this.prismaService.supplier.findFirst({
                where: Object.assign({ name: {
                        equals: name
                    } }, (excludeId && { id: { not: excludeId } })),
                select: { id: true, name: true, contactEmail: true }
            });
            if (nameExists) {
                result.nameExists = true;
                result.existingSuppliers.push(nameExists);
            }
        }
        if (email) {
            const emailExists = await this.prismaService.supplier.findFirst({
                where: Object.assign({ contactEmail: {
                        equals: email
                    } }, (excludeId && { id: { not: excludeId } })),
                select: { id: true, name: true, contactEmail: true }
            });
            if (emailExists && !result.existingSuppliers.find(s => s.id === emailExists.id)) {
                result.emailExists = true;
                result.existingSuppliers.push(emailExists);
            }
        }
        return result;
    }
    async checkDependencies(id) {
        try {
            const supplier = await this.prismaService.supplier.findUnique({
                where: { id },
                include: {
                    services: {
                        select: { id: true, name: true }
                    },
                    users: {
                        select: { id: true, name: true, email: true }
                    },
                    transportServices: {
                        select: { id: true, name: true }
                    },
                    hotelServices: {
                        select: { id: true, name: true }
                    },
                }
            });
            if (!supplier) {
                throw new Error(`Supplier with id ${id} not found`);
            }
            const dependencies = {
                supplier: {
                    id: supplier.id,
                    name: supplier.name
                },
                services: supplier.services,
                users: supplier.users,
                transportServices: supplier.transportServices,
                hotelServices: supplier.hotelServices,
                canDelete: (supplier.services.length === 0 &&
                    supplier.users.length === 0 &&
                    supplier.transportServices.length === 0 &&
                    supplier.hotelServices.length === 0),
                totalDependencies: (supplier.services.length +
                    supplier.users.length +
                    supplier.transportServices.length +
                    supplier.hotelServices.length)
            };
            return dependencies;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to check dependencies: ${errorMessage}`);
        }
    }
    async findOne(id) {
        const supplierFound = await this.prismaService.supplier.findUnique({
            where: {
                id: id
            }
        });
        if (!supplierFound) {
            throw new Error(`Supplier with id ${id} not found`);
        }
        return supplierFound;
    }
    async update(id, updateSupplierDto) {
        const productFound = await this.prismaService.supplier.update({
            where: {
                id: id
            },
            data: updateSupplierDto
        });
        if (!productFound) {
            throw new Error(`Supplier with id ${id} not found`);
        }
        return productFound;
    }
    async remove(id) {
        try {
            console.log(`=== ATTEMPTING TO DELETE SUPPLIER ${id} ===`);
            const supplier = await this.prismaService.supplier.findUnique({
                where: { id },
                include: {
                    services: true,
                    users: true,
                    transportServices: true,
                    hotelServices: true,
                }
            });
            if (!supplier) {
                throw new Error(`Supplier with id ${id} not found`);
            }
            console.log('Supplier found:', {
                id: supplier.id,
                name: supplier.name,
                servicesCount: supplier.services.length,
                usersCount: supplier.users.length,
                transportServicesCount: supplier.transportServices.length,
                hotelServicesCount: supplier.hotelServices.length,
            });
            const totalDependencies = supplier.services.length +
                supplier.users.length +
                supplier.transportServices.length +
                supplier.hotelServices.length;
            if (totalDependencies > 0) {
                const errorMessage = `Cannot delete supplier "${supplier.name}". It has dependencies: ${supplier.services.length} services, ${supplier.users.length} users, ${supplier.transportServices.length} transport services, ${supplier.hotelServices.length} hotel services`;
                console.error(errorMessage);
                throw new common_1.ConflictException(errorMessage);
            }
            const deletedSupplier = await this.prismaService.supplier.delete({
                where: { id }
            });
            console.log('✅ Supplier deleted successfully:', deletedSupplier.name);
            return {
                success: true,
                message: `Supplier "${deletedSupplier.name}" deleted successfully`,
                deletedSupplier
            };
        }
        catch (error) {
            console.error('Error deleting supplier:', error);
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to delete supplier with id ${id}: ${errorMessage}`);
        }
    }
    async softDelete(id) {
        try {
            const supplier = await this.prismaService.supplier.findUnique({
                where: { id }
            });
            if (!supplier) {
                throw new Error(`Supplier with id ${id} not found`);
            }
            return {
                success: true,
                message: `Supplier "${supplier.name}" marked as inactive`,
                supplier
            };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to soft delete supplier: ${errorMessage}`);
        }
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map