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
    async create(createSupplierDto) {
        try {
            return await this.prismaService.supplier.create({
                data: createSupplierDto
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                const prismaError = error;
                if (prismaError.code === 'P2002') {
                    throw new common_1.ConflictException(`Supplier with name ${createSupplierDto.name} already exists`);
                }
            }
        }
    }
    findAll() {
        return this.prismaService.supplier.findMany();
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
        const deletedSupplier = await this.prismaService.supplier.delete({
            where: {
                id: id
            }
        });
        if (!deletedSupplier) {
            throw new Error(`Supplier with id ${id} not found`);
        }
        return deletedSupplier;
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map