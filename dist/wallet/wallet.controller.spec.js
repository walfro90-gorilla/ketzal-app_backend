"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const wallet_controller_1 = require("./wallet.controller");
const wallet_service_1 = require("./wallet.service");
const common_1 = require("@nestjs/common");
const mockWallet = {
    id: 'wallet-1',
    userId: 'user-1',
    balanceMXN: 1000,
    balanceAxo: 500,
    transactions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};
const mockWalletService = {
    getOrCreateWallet: jest.fn().mockResolvedValue(mockWallet),
    addFunds: jest.fn().mockResolvedValue(mockWallet),
    transferFunds: jest.fn().mockResolvedValue(mockWallet),
    getTransactions: jest.fn().mockResolvedValue({ transactions: [], pagination: {} }),
    convertCurrency: jest.fn().mockResolvedValue({ wallet: mockWallet, conversion: {} }),
};
describe('WalletController', () => {
    let controller;
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [wallet_controller_1.WalletController],
            providers: [
                {
                    provide: wallet_service_1.WalletService,
                    useValue: mockWalletService,
                },
            ],
        }).compile();
        controller = module.get(wallet_controller_1.WalletController);
        service = module.get(wallet_service_1.WalletService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('getWallet', () => {
        it('should return a wallet for a given user ID', async () => {
            const userId = 'user-1';
            const result = await controller.getWallet(userId);
            expect(service.getOrCreateWallet).toHaveBeenCalledWith(userId);
            expect(result).toEqual({ success: true, wallet: mockWallet });
        });
        it('should throw HttpException if user not found', async () => {
            const userId = 'non-existent-user';
            service.getOrCreateWallet.mockRejectedValue(new Error('User not found: non-existent-user'));
            await expect(controller.getWallet(userId)).rejects.toThrow(new common_1.HttpException('Usuario no encontrado en la base de datos', common_1.HttpStatus.NOT_FOUND));
        });
        it('should throw HttpException for other errors', async () => {
            const userId = 'user-1';
            service.getOrCreateWallet.mockRejectedValue(new Error('Some other error'));
            await expect(controller.getWallet(userId)).rejects.toThrow(new common_1.HttpException('Error al obtener wallet: Some other error', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
    describe('addFunds', () => {
        it('should add funds successfully', async () => {
            const userId = 'user-1';
            const addFundsDto = { amountMXN: 100, amountAxo: 0 };
            const expectedResult = { success: true, wallet: mockWallet, message: 'Fondos agregados exitosamente' };
            service.addFunds.mockResolvedValue(mockWallet);
            const result = await controller.addFunds(userId, addFundsDto);
            expect(service.addFunds).toHaveBeenCalledWith(userId, 100, 0, undefined, undefined);
            expect(result).toEqual(expectedResult);
        });
        it('should throw HttpException if no amount is specified', async () => {
            const userId = 'user-1';
            const addFundsDto = {};
            await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException if amount is zero or less', async () => {
            const userId = 'user-1';
            const addFundsDto = { amountMXN: 0, amountAxo: 0 };
            await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException for other service errors', async () => {
            const userId = 'user-1';
            const addFundsDto = { amountMXN: 100 };
            service.addFunds.mockRejectedValue(new Error('Service error'));
            await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(new common_1.HttpException('Error al agregar fondos', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
    describe('transferFunds', () => {
        it('should transfer funds successfully', async () => {
            const userId = 'user-1';
            const transferDto = { recipientEmail: 'recipient@example.com', amountMXN: 100, amountAxo: 0 };
            const expectedResult = { success: true, wallet: mockWallet, message: 'Transferencia realizada exitosamente' };
            service.transferFunds.mockResolvedValue(mockWallet);
            const result = await controller.transferFunds(userId, transferDto);
            expect(service.transferFunds).toHaveBeenCalledWith(userId, transferDto.recipientEmail, 100, 0, undefined);
            expect(result).toEqual(expectedResult);
        });
        it('should throw HttpException if recipient email is missing', async () => {
            const userId = 'user-1';
            const transferDto = { recipientEmail: '', amountMXN: 100 };
            await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(new common_1.HttpException('Email del destinatario requerido', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException if no amount is specified', async () => {
            const userId = 'user-1';
            const transferDto = { recipientEmail: 'recipient@example.com' };
            await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException for other service errors', async () => {
            const userId = 'user-1';
            const transferDto = { recipientEmail: 'recipient@example.com', amountMXN: 100 };
            service.transferFunds.mockRejectedValue(new Error('Service error'));
            await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(new common_1.HttpException('Error al transferir fondos', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
    describe('getTransactions', () => {
        it('should return transactions successfully', async () => {
            const userId = 'user-1';
            const mockTransactions = { transactions: [{ id: 'txn-1' }], pagination: { total: 1, limit: 10, offset: 0, hasMore: false } };
            service.getTransactions.mockResolvedValue(mockTransactions);
            const result = await controller.getTransactions(userId, '10', '0');
            expect(service.getTransactions).toHaveBeenCalledWith(userId, 10, 0);
            expect(result).toEqual(Object.assign({ success: true }, mockTransactions));
        });
        it('should throw HttpException for service errors', async () => {
            const userId = 'user-1';
            service.getTransactions.mockRejectedValue(new Error('Service error'));
            await expect(controller.getTransactions(userId, '10', '0')).rejects.toThrow(new common_1.HttpException('Error al obtener transacciones', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
    describe('convertCurrency', () => {
        it('should convert currency successfully', async () => {
            const userId = 'user-1';
            const convertDto = { fromCurrency: 'MXN', toCurrency: 'AXO', amount: 100 };
            const mockConversionResult = { wallet: mockWallet, conversion: { from: { currency: 'MXN', amount: 100 }, to: { currency: 'AXO', amount: 80 }, rate: 0.8 } };
            const expectedResult = Object.assign(Object.assign({ success: true }, mockConversionResult), { message: 'Conversión realizada exitosamente' });
            service.convertCurrency.mockResolvedValue(mockConversionResult);
            const result = await controller.convertCurrency(userId, convertDto);
            expect(service.convertCurrency).toHaveBeenCalledWith(userId, 'MXN', 'AXO', 100);
            expect(result).toEqual(expectedResult);
        });
        it('should throw HttpException if fromCurrency and toCurrency are the same', async () => {
            const userId = 'user-1';
            const convertDto = { fromCurrency: 'MXN', toCurrency: 'MXN', amount: 100 };
            await expect(controller.convertCurrency(userId, convertDto)).rejects.toThrow(new common_1.HttpException('Las monedas deben ser diferentes', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException for other service errors', async () => {
            const userId = 'user-1';
            const convertDto = { fromCurrency: 'MXN', toCurrency: 'AXO', amount: 100 };
            service.convertCurrency.mockRejectedValue(new Error('Service error'));
            await expect(controller.convertCurrency(userId, convertDto)).rejects.toThrow(new common_1.HttpException('Error al convertir moneda', common_1.HttpStatus.INTERNAL_SERVER_ERROR));
        });
    });
});
//# sourceMappingURL=wallet.controller.spec.js.map