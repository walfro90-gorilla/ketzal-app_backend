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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createServiceDto) {
        return this.prismaService.service.create({ data: createServiceDto });
    }
    findAll() {
        return this.prismaService.service.findMany();
    }
    async findOne(id) {
        const serviceFound = await this.prismaService.service.findUnique({
            where: { id }
        });
        if (!serviceFound) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return serviceFound;
    }
    async update(id, updateServiceDto) {
        const updatedService = await this.prismaService.service.update({
            where: { id },
            data: updateServiceDto
        });
        if (!updatedService) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return updatedService;
    }
    async remove(id) {
        const deletedService = await this.prismaService.service.delete({
            where: { id }
        });
        if (!deletedService) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return deletedService;
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map