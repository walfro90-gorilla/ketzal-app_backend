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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TestController = class TestController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTestUser() {
        try {
            const user = await this.prisma.user.upsert({
                where: { email: 'test@ketzal.com' },
                update: {},
                create: {
                    email: 'test@ketzal.com',
                    name: 'Usuario de Prueba',
                    password: 'hashedpassword123',
                    role: 'user',
                    referralCode: 'TEST123',
                    axoCoinsEarned: 50
                },
            });
            const wallet = await this.prisma.wallet.upsert({
                where: { userId: user.id },
                update: {},
                create: {
                    userId: user.id,
                    balanceMXN: 1000.0,
                    balanceAxo: 500.0,
                },
            });
            const transactions = await Promise.all([
                this.prisma.walletTransaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'DEPOSIT',
                        amountMXN: 1000.0,
                        description: 'Depósito inicial de bienvenida',
                        reference: 'WELCOME-001',
                    },
                }),
                this.prisma.walletTransaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'REWARD',
                        amountAxo: 500.0,
                        description: 'Recompensa por registro',
                        reference: 'REWARD-001',
                    },
                }),
                this.prisma.walletTransaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'PURCHASE',
                        amountMXN: 250.0,
                        description: 'Compra de tour a Teotihuacán',
                        reference: 'TOUR-001',
                    },
                }),
                this.prisma.walletTransaction.create({
                    data: {
                        walletId: wallet.id,
                        type: 'TRANSFER_RECEIVED',
                        amountMXN: 100.0,
                        description: 'Transferencia de amigo',
                        reference: 'TRANSFER-001',
                    },
                }),
            ]);
            return {
                success: true,
                user,
                wallet,
                transactions,
                message: 'Usuario de prueba creado exitosamente'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
                message: 'Error al crear usuario de prueba'
            };
        }
    }
    async getTestWallet(userId) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
                include: {
                    transactions: {
                        orderBy: { createdAt: 'desc' },
                        take: 10,
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });
            if (!wallet) {
                return { success: false, message: 'Wallet no encontrado' };
            }
            return { success: true, wallet };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
                message: 'Error al obtener wallet de prueba'
            };
        }
    }
    async addTestFunds(userId, { amount, currency }) {
        try {
            const wallet = await this.prisma.wallet.findUnique({
                where: { userId },
            });
            if (!wallet) {
                return { success: false, message: 'Wallet no encontrado' };
            }
            const updateData = currency === 'MXN'
                ? { balanceMXN: { increment: amount } }
                : { balanceAxo: { increment: amount } };
            const updatedWallet = await this.prisma.wallet.update({
                where: { userId },
                data: updateData,
            });
            await this.prisma.walletTransaction.create({
                data: Object.assign(Object.assign({ walletId: wallet.id, type: 'DEPOSIT' }, (currency === 'MXN' ? { amountMXN: amount } : { amountAxo: amount })), { description: `Depósito de prueba de ${amount} ${currency}`, reference: `TEST-${Date.now()}` }),
            });
            return {
                success: true,
                wallet: updatedWallet,
                message: `${amount} ${currency} agregados exitosamente`
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Error desconocido',
                message: 'Error al agregar fondos de prueba'
            };
        }
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.Post)('create-test-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestController.prototype, "createTestUser", null);
__decorate([
    (0, common_1.Get)('wallet/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getTestWallet", null);
__decorate([
    (0, common_1.Post)('add-funds/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "addTestFunds", null);
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestController);
//# sourceMappingURL=test.controller.js.map