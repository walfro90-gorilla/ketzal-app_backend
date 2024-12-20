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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ProductsService = class ProductsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createProductDto) {
        try {
            return await this.prismaService.product.create({
                data: createProductDto
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new common_1.ConflictException(`Product with name ${createProductDto.name} already exists`);
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    findAll() {
        return this.prismaService.product.findMany();
    }
    async findOne(id) {
        const productFound = await this.prismaService.product.findUnique({
            where: {
                id: id
            }
        });
        if (!productFound) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return productFound;
    }
    async update(id, updateProductDto) {
        const productFound = await this.prismaService.product.update({
            where: {
                id: id
            },
            data: updateProductDto
        });
        if (!productFound) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return productFound;
    }
    async remove(id) {
        const deletedProuct = await this.prismaService.product.delete({
            where: {
                id: id
            }
        });
        if (!deletedProuct) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return deletedProuct;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map