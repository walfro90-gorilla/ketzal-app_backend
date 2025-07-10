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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getWallet(userId) {
        var _a;
        try {
            console.log('🔄 Backend: Getting wallet for user:', userId);
            const wallet = await this.walletService.getOrCreateWallet(userId);
            console.log('✅ Backend: Wallet retrieved successfully for user:', userId);
            return {
                success: true,
                wallet
            };
        }
        catch (error) {
            console.error('❌ Backend: Error getting wallet for user:', userId, error);
            if ((error === null || error === void 0 ? void 0 : error.code) === 'P2025' || ((_a = error === null || error === void 0 ? void 0 : error.message) === null || _a === void 0 ? void 0 : _a.includes('User not found'))) {
                throw new common_1.HttpException('Usuario no encontrado en la base de datos', common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(`Error al obtener wallet: ${(error === null || error === void 0 ? void 0 : error.message) || 'Error desconocido'}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async addFunds(userId, addFundsDto) {
        try {
            const { amountMXN, amountAxo, description, paymentMethod } = addFundsDto;
            if (!amountMXN && !amountAxo) {
                throw new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST);
            }
            if ((amountMXN && amountMXN <= 0) || (amountAxo && amountAxo <= 0)) {
                throw new common_1.HttpException('La cantidad debe ser mayor a 0', common_1.HttpStatus.BAD_REQUEST);
            }
            const wallet = await this.walletService.addFunds(userId, amountMXN || 0, amountAxo || 0, description, paymentMethod);
            return {
                success: true,
                wallet,
                message: 'Fondos agregados exitosamente'
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error al agregar fondos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async transferFunds(userId, transferDto) {
        try {
            const { recipientEmail, amountMXN, amountAxo, description } = transferDto;
            if (!recipientEmail) {
                throw new common_1.HttpException('Email del destinatario requerido', common_1.HttpStatus.BAD_REQUEST);
            }
            if (!amountMXN && !amountAxo) {
                throw new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST);
            }
            const wallet = await this.walletService.transferFunds(userId, recipientEmail, amountMXN || 0, amountAxo || 0, description);
            return {
                success: true,
                wallet,
                message: 'Transferencia realizada exitosamente'
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error al transferir fondos', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransactions(userId, limit = '20', offset = '0') {
        try {
            const transactions = await this.walletService.getTransactions(userId, Number(limit), Number(offset));
            return Object.assign({ success: true }, transactions);
        }
        catch (error) {
            throw new common_1.HttpException('Error al obtener transacciones', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async convertCurrency(userId, convertDto) {
        try {
            const { fromCurrency, toCurrency, amount } = convertDto;
            if (fromCurrency === toCurrency) {
                throw new common_1.HttpException('Las monedas deben ser diferentes', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.walletService.convertCurrency(userId, fromCurrency, toCurrency, amount);
            return Object.assign(Object.assign({ success: true }, result), { message: 'Conversión realizada exitosamente' });
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Error al convertir moneda', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)(':userId/add-funds'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "addFunds", null);
__decorate([
    (0, common_1.Post)(':userId/transfer'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transferFunds", null);
__decorate([
    (0, common_1.Get)(':userId/transactions'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)(':userId/convert'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "convertCurrency", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map