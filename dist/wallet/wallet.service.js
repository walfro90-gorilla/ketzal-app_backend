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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateWallet(userId) {
        console.log('🔄 Service: Getting or creating wallet for user:', userId);
        const user = await this.prisma.users.findUnique({
            where: { id: userId }
        });
        if (!user) {
            console.error('❌ Service: User not found:', userId);
            throw new Error(`User not found: ${userId}`);
        }
        console.log('✅ Service: User found:', user.email);
        let wallet = await this.prisma.wallet.findUnique({
            where: { userId }
        });
        if (!wallet) {
            console.log('🆕 Service: Creating new wallet for user:', userId);
            const walletId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            wallet = await this.prisma.wallet.create({
                data: {
                    id: walletId,
                    userId,
                    balanceMXN: 0,
                    balanceAxo: 50,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
            const transactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await this.prisma.walletTransaction.create({
                data: {
                    id: transactionId,
                    walletId: wallet.id,
                    type: 'REWARD',
                    amountAxo: 50,
                    description: '🎉 Regalo de bienvenida - 50 AXO Coins',
                    reference: 'WELCOME_BONUS',
                    createdAt: new Date()
                }
            });
            console.log('✅ Service: New wallet created with welcome bonus');
        }
        else {
            console.log('✅ Service: Existing wallet found');
        }
        return wallet;
    }
    async addFunds(userId, amountMXN, amountAxo, description, paymentMethod) {
        let wallet = await this.prisma.wallet.findUnique({
            where: { userId }
        });
        if (!wallet) {
            const walletId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            wallet = await this.prisma.wallet.create({
                data: {
                    id: walletId,
                    userId,
                    balanceMXN: amountMXN,
                    balanceAxo: amountAxo,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }
        const updatedWallet = await this.prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                balanceMXN: {
                    increment: amountMXN
                },
                balanceAxo: {
                    increment: amountAxo
                },
                updatedAt: new Date()
            }
        });
        const transactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await this.prisma.walletTransaction.create({
            data: {
                id: transactionId,
                walletId: wallet.id,
                type: 'DEPOSIT',
                amountMXN: amountMXN > 0 ? amountMXN : null,
                amountAxo: amountAxo > 0 ? amountAxo : null,
                description: description || `Depósito de ${amountMXN > 0 ? `${amountMXN} MXN` : ''}${amountMXN > 0 && amountAxo > 0 ? ' y ' : ''}${amountAxo > 0 ? `${amountAxo} AXO` : ''}`,
                reference: paymentMethod || 'MANUAL',
                createdAt: new Date()
            }
        });
        return updatedWallet;
    }
    async transferFunds(userId, recipientEmail, amountMXN, amountAxo, description) {
        const recipient = await this.prisma.users.findUnique({
            where: { email: recipientEmail }
        });
        if (!recipient) {
            throw new common_1.HttpException('Usuario destinatario no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const senderWallet = await this.prisma.wallet.findUnique({
            where: { userId }
        });
        if (!senderWallet) {
            throw new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        if ((amountMXN > 0 && senderWallet.balanceMXN < amountMXN) ||
            (amountAxo > 0 && senderWallet.balanceAxo < amountAxo)) {
            throw new common_1.HttpException('Fondos insuficientes', common_1.HttpStatus.BAD_REQUEST);
        }
        let recipientWallet = await this.prisma.wallet.findUnique({
            where: { userId: recipient.id }
        });
        if (!recipientWallet) {
            const walletId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            recipientWallet = await this.prisma.wallet.create({
                data: {
                    id: walletId,
                    userId: recipient.id,
                    balanceMXN: 0,
                    balanceAxo: 50,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            });
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedSenderWallet = await tx.wallet.update({
                where: { id: senderWallet.id },
                data: {
                    balanceMXN: {
                        decrement: amountMXN
                    },
                    balanceAxo: {
                        decrement: amountAxo
                    },
                    updatedAt: new Date()
                }
            });
            await tx.wallet.update({
                where: { id: recipientWallet.id },
                data: {
                    balanceMXN: {
                        increment: amountMXN
                    },
                    balanceAxo: {
                        increment: amountAxo
                    },
                    updatedAt: new Date()
                }
            });
            const senderTransactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const recipientTransactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await tx.walletTransaction.create({
                data: {
                    id: senderTransactionId,
                    walletId: senderWallet.id,
                    type: 'TRANSFER_SENT',
                    amountMXN: amountMXN > 0 ? -amountMXN : null,
                    amountAxo: amountAxo > 0 ? -amountAxo : null,
                    description: description || `Transferencia a ${recipient.email}`,
                    reference: recipient.id,
                    createdAt: new Date()
                }
            });
            await tx.walletTransaction.create({
                data: {
                    id: recipientTransactionId,
                    walletId: recipientWallet.id,
                    type: 'TRANSFER_RECEIVED',
                    amountMXN: amountMXN > 0 ? amountMXN : null,
                    amountAxo: amountAxo > 0 ? amountAxo : null,
                    description: description || `Transferencia de ${userId}`,
                    reference: userId,
                    createdAt: new Date()
                }
            });
            return updatedSenderWallet;
        });
        return result;
    }
    async getTransactions(userId, limit, offset) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId }
        });
        if (!wallet) {
            throw new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const transactions = await this.prisma.walletTransaction.findMany({
            where: { walletId: wallet.id },
            orderBy: { createdAt: 'desc' },
            take: limit,
            skip: offset
        });
        const total = await this.prisma.walletTransaction.count({
            where: { walletId: wallet.id }
        });
        return {
            transactions,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + limit < total
            }
        };
    }
    async convertCurrency(userId, fromCurrency, toCurrency, amount) {
        const MXN_TO_AXO_RATE = 0.8;
        const AXO_TO_MXN_RATE = 1.1;
        const wallet = await this.prisma.wallet.findUnique({
            where: { userId }
        });
        if (!wallet) {
            throw new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        let convertedAmount;
        let fromAmount;
        let toAmount;
        if (fromCurrency === 'MXN' && toCurrency === 'AXO') {
            if (wallet.balanceMXN < amount) {
                throw new common_1.HttpException('Fondos MXN insuficientes', common_1.HttpStatus.BAD_REQUEST);
            }
            convertedAmount = amount * MXN_TO_AXO_RATE;
            fromAmount = -amount;
            toAmount = convertedAmount;
        }
        else if (fromCurrency === 'AXO' && toCurrency === 'MXN') {
            if (wallet.balanceAxo < amount) {
                throw new common_1.HttpException('Fondos AXO insuficientes', common_1.HttpStatus.BAD_REQUEST);
            }
            convertedAmount = amount * AXO_TO_MXN_RATE;
            fromAmount = -amount;
            toAmount = convertedAmount;
        }
        else {
            throw new common_1.HttpException('Conversión no soportada', common_1.HttpStatus.BAD_REQUEST);
        }
        const updatedWallet = await this.prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                balanceMXN: {
                    increment: fromCurrency === 'MXN' ? fromAmount : toAmount
                },
                balanceAxo: {
                    increment: fromCurrency === 'AXO' ? fromAmount : toAmount
                },
                updatedAt: new Date()
            }
        });
        const transactionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await this.prisma.walletTransaction.create({
            data: {
                id: transactionId,
                walletId: wallet.id,
                type: 'DEPOSIT',
                amountMXN: fromCurrency === 'MXN' ? fromAmount : toAmount,
                amountAxo: fromCurrency === 'AXO' ? fromAmount : toAmount,
                description: `Conversión: ${amount} ${fromCurrency} → ${convertedAmount.toFixed(2)} ${toCurrency}`,
                reference: 'CURRENCY_CONVERSION',
                createdAt: new Date()
            }
        });
        return {
            wallet: updatedWallet,
            conversion: {
                from: { currency: fromCurrency, amount },
                to: { currency: toCurrency, amount: convertedAmount },
                rate: fromCurrency === 'MXN' ? MXN_TO_AXO_RATE : AXO_TO_MXN_RATE
            }
        };
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map