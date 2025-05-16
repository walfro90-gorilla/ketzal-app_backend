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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let UsersService = class UsersService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        try {
            return await this.prismaService.user.create({
                data: createUserDto
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ConflictException(`User with email ${createUserDto.email} already exists`);
                }
            }
        }
    }
    findAll() {
        return this.prismaService.user.findMany();
    }
    async findOne(id) {
        const userFound = await this.prismaService.user.findUnique({
            where: { id: id.toString() }
        });
        if (!userFound) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return userFound;
    }
    async update(id, updateUserDto) {
        const userFound = await this.prismaService.user.update({
            where: { id: id.toString() },
            data: updateUserDto
        });
        if (!userFound) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return userFound;
    }
    async remove(id) {
        const deletedUser = await this.prismaService.user.delete({
            where: {
                id: id.toString()
            }
        });
        if (!deletedUser) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return deletedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map