"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const wallet_controller_1 = require("./wallet.controller");
const wallet_service_1 = require("./wallet.service");
const common_1 = require("@nestjs/common");
const mockWalletService = {
    getOrCreateWallet: jest.fn(),
    addFunds: jest.fn(),
    transferFunds: jest.fn(),
    getTransactions: jest.fn(),
    convertCurrency: jest.fn(),
};
describe('WalletController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [wallet_controller_1.WalletController],
            providers: [
                { provide: wallet_service_1.WalletService, useValue: mockWalletService },
            ],
        }).compile();
        controller = module.get(wallet_controller_1.WalletController);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('getWallet', () => {
        it('should call walletService.getOrCreateWallet with the correct userId', async () => {
            const userId = '1';
            await controller.getWallet(userId);
            expect(mockWalletService.getOrCreateWallet).toHaveBeenCalledWith(userId);
        });
    });
    describe('addFunds', () => {
        it('should call walletService.addFunds with the correct data', async () => {
            const userId = '1';
            const addFundsDto = { amountMXN: 100 };
            await controller.addFunds(userId, addFundsDto);
            expect(mockWalletService.addFunds).toHaveBeenCalledWith(userId, 100, 0, undefined, undefined);
        });
        it('should throw HttpException if no amount is provided', async () => {
            const userId = '1';
            const addFundsDto = {};
            await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(new common_1.HttpException('Debe especificar una cantidad', common_1.HttpStatus.BAD_REQUEST));
        });
    });
    describe('transferFunds', () => {
        it('should call walletService.transferFunds with the correct data', async () => {
            const userId = '1';
            const transferDto = { recipientEmail: 'test@test.com', amountMXN: 100 };
            await controller.transferFunds(userId, transferDto);
            expect(mockWalletService.transferFunds).toHaveBeenCalledWith(userId, 'test@test.com', 100, 0, undefined);
        });
        it('should throw HttpException if no recipientEmail is provided', async () => {
            const userId = '1';
            const transferDto = { recipientEmail: '', amountMXN: 100 };
            await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(new common_1.HttpException('Email del destinatario requerido', common_1.HttpStatus.BAD_REQUEST));
        });
    });
    describe('getTransactions', () => {
        it('should call walletService.getTransactions with the correct data', async () => {
            const userId = '1';
            await controller.getTransactions(userId, '10', '0');
            expect(mockWalletService.getTransactions).toHaveBeenCalledWith(userId, 10, 0);
        });
    });
    describe('convertCurrency', () => {
        it('should call walletService.convertCurrency with the correct data', async () => {
            const userId = '1';
            const convertDto = { fromCurrency: 'MXN', toCurrency: 'AXO', amount: 100 };
            await controller.convertCurrency(userId, convertDto);
            expect(mockWalletService.convertCurrency).toHaveBeenCalledWith(userId, 'MXN', 'AXO', 100);
        });
        it('should throw HttpException if currencies are the same', async () => {
            const userId = '1';
            const convertDto = { fromCurrency: 'MXN', toCurrency: 'MXN', amount: 100 };
            await expect(controller.convertCurrency(userId, convertDto)).rejects.toThrow(new common_1.HttpException('Las monedas deben ser diferentes', common_1.HttpStatus.BAD_REQUEST));
        });
    });
});
//# sourceMappingURL=wallet.controller.spec.js.map