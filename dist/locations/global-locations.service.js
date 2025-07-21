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
exports.GlobalLocationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GlobalLocationsService = class GlobalLocationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    transformBigInt(obj) {
        if (obj && typeof obj.id === 'bigint') {
            return Object.assign(Object.assign({}, obj), { id: Number(obj.id) });
        }
        return obj;
    }
    create(createDto) {
        return this.prisma.global_locations.create({ data: createDto }).then(this.transformBigInt);
    }
    async findAll() {
        const locations = await this.prisma.global_locations.findMany();
        return locations.map(location => this.transformBigInt(location));
    }
    async findOne(id) {
        const location = await this.prisma.global_locations.findUnique({ where: { id } });
        if (!location)
            throw new common_1.NotFoundException(`Location #${id} not found`);
        return this.transformBigInt(location);
    }
    async update(id, updateDto) {
        const updated = await this.prisma.global_locations.update({ where: { id }, data: updateDto });
        if (!updated)
            throw new common_1.NotFoundException(`Location #${id} not found`);
        return this.transformBigInt(updated);
    }
    async remove(id) {
        const deleted = await this.prisma.global_locations.delete({ where: { id } });
        if (!deleted)
            throw new common_1.NotFoundException(`Location #${id} not found`);
        return deleted;
    }
};
exports.GlobalLocationsService = GlobalLocationsService;
exports.GlobalLocationsService = GlobalLocationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GlobalLocationsService);
//# sourceMappingURL=global-locations.service.js.map