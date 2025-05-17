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
const library_1 = require("@prisma/client/runtime/library");
let ProductsService = class ProductsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createProductDto) {
        var _a;
        try {
            return await this.prismaService.product.create({
                data: {
                    name: createProductDto.name,
                    description: createProductDto.description,
                    price: createProductDto.price,
                    stock: createProductDto.stock,
                    image: (_a = createProductDto.image) !== null && _a !== void 0 ? _a : '',
                }
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                const prismaError = error;
                if (prismaError.code === 'P2002') {
                    throw new common_1.ConflictException(`Product with name ${createProductDto.name} already exists`);
                }
            }
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
        const deleteProduct = await this.prismaService.product.delete({
            where: {
                id: id
            }
        });
        if (!deleteProduct) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return deleteProduct;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map