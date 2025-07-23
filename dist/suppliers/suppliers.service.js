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
let SuppliersService = class SuppliersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
    findAll() {
        return this.prismaService.supplier.findMany();
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map