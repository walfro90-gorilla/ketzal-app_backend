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
const client_1 = require("@prisma/client");
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
                    priceAxo: createProductDto.priceAxo,
                    stock: createProductDto.stock,
                    image: (_a = createProductDto.image) !== null && _a !== void 0 ? _a : '',
                    category: createProductDto.category,
                    images: createProductDto.images ? createProductDto.images : undefined,
                    specifications: createProductDto.specifications ? createProductDto.specifications : undefined,
                    tags: createProductDto.tags ? createProductDto.tags : undefined,
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
    async findAll() {
        const products = await this.prismaService.product.findMany();
        return products.map((product) => this.parseProductJson(product));
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
        return this.parseProductJson(productFound);
    }
    async update(id, updateProductDto) {
        try {
            const updateData = Object.assign({}, updateProductDto);
            if (updateProductDto.images !== undefined) {
                updateData.images = updateProductDto.images ? updateProductDto.images : undefined;
            }
            if (updateProductDto.specifications !== undefined) {
                updateData.specifications = updateProductDto.specifications ? updateProductDto.specifications : undefined;
            }
            if (updateProductDto.tags !== undefined) {
                updateData.tags = updateProductDto.tags ? updateProductDto.tags : undefined;
            }
            return await this.prismaService.product.update({
                where: {
                    id: id
                },
                data: updateData
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Product with id ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prismaService.product.delete({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException(`Product with id ${id} not found`);
            }
            throw error;
        }
    }
    async findByCategory(category) {
        const products = await this.prismaService.product.findMany({
            where: {
                category: category
            }
        });
        return products.map((product) => this.parseProductJson(product));
    }
    async searchProducts(query, category) {
        const products = await this.prismaService.product.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: query } },
                            { description: { contains: query } }
                        ]
                    },
                    category ? { category: category } : {}
                ]
            }
        });
        return products.map((product) => this.parseProductJson(product));
    }
    parseProductJson(product) {
        return Object.assign(Object.assign({}, product), { images: product.images ? JSON.parse(product.images) : [], specifications: product.specifications ? JSON.parse(product.specifications) : {}, tags: product.tags ? JSON.parse(product.tags) : [] });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map