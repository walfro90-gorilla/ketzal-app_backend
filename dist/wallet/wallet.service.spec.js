"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const wallet_service_1 = require("./wallet.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
};
const mockWallet = {
    id: 'wallet-1',
    userId: 'user-1',
    balanceMXN: 1000,
    balanceAxo: 500,
    transactions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};
const mockPrismaService = {
    user: {
        findUnique: jest.fn(),
    },
    wallet: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    },
    walletTransaction: {
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
    },
    $transaction: jest.fn().mockImplementation(async (callback) => callback(mockPrismaService)),
};
describe('WalletService', () => {
    let service;
    let prisma;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                wallet_service_1.WalletService,
                { provide: prisma_service_1.PrismaService, useValue: mockPrismaService },
            ],
        }).compile();
        service = module.get(wallet_service_1.WalletService);
        prisma = module.get(prisma_service_1.PrismaService);
        jest.clearAllMocks();
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getOrCreateWallet', () => {
        it('should return an existing wallet', async () => {
            prisma.user.findUnique.mockResolvedValue(mockUser);
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            const result = await service.getOrCreateWallet(mockUser.id);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockUser.id } });
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({
                where: { userId: mockUser.id },
                include: { transactions: { orderBy: { createdAt: 'desc' }, take: 10 } },
            });
            expect(result).toEqual(mockWallet);
            expect(prisma.wallet.create).not.toHaveBeenCalled();
        });
        it('should create a new wallet if one does not exist', async () => {
            const newWallet = Object.assign(Object.assign({}, mockWallet), { balanceAxo: 50, transactions: [] });
            prisma.user.findUnique.mockResolvedValue(mockUser);
            prisma.wallet.findUnique.mockResolvedValue(null);
            prisma.wallet.create.mockResolvedValue(newWallet);
            prisma.walletTransaction.create.mockResolvedValue({});
            const result = await service.getOrCreateWallet(mockUser.id);
            expect(prisma.wallet.create).toHaveBeenCalledWith({
                data: { userId: mockUser.id, balanceMXN: 0, balanceAxo: 50 },
                include: { transactions: true },
            });
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith({
                data: {
                    walletId: newWallet.id,
                    type: 'REWARD',
                    amountAxo: 50,
                    description: '🎉 Regalo de bienvenida - 50 AXO Coins',
                    reference: 'WELCOME_BONUS',
                },
            });
            expect(result).toEqual(newWallet);
        });
        it('should throw an error if the user does not exist', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(service.getOrCreateWallet('non-existent-user')).rejects.toThrow('User not found: non-existent-user');
        });
    });
    describe('addFunds', () => {
        it('should add funds to an existing wallet', async () => {
            const updatedWalletData = Object.assign(Object.assign({}, mockWallet), { balanceMXN: mockWallet.balanceMXN + 100 });
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(updatedWalletData);
            const result = await service.addFunds(mockUser.id, 100, 0, 'Test Deposit');
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
            expect(prisma.wallet.update).toHaveBeenCalledWith({
                where: { id: mockWallet.id },
                data: {
                    balanceMXN: { increment: 100 },
                    balanceAxo: { increment: 0 },
                },
            });
            expect(prisma.walletTransaction.create).toHaveBeenCalled();
            expect(result).toEqual(updatedWalletData);
        });
        it('should create a wallet if it does not exist and then add funds', async () => {
            const newWallet = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 100, balanceAxo: 50 });
            prisma.wallet.findUnique.mockResolvedValue(null);
            prisma.wallet.create.mockResolvedValue(Object.assign(Object.assign({}, mockWallet), { balanceMXN: 0, balanceAxo: 50 }));
            prisma.wallet.update.mockResolvedValue(newWallet);
            const result = await service.addFunds(mockUser.id, 100, 0, 'Initial Deposit');
            expect(prisma.wallet.create).toHaveBeenCalledWith({
                data: { userId: mockUser.id, balanceMXN: 0, balanceAxo: 50 },
            });
            expect(prisma.wallet.update).toHaveBeenCalledWith({
                where: { id: mockWallet.id },
                data: {
                    balanceMXN: { increment: 100 },
                    balanceAxo: { increment: 0 },
                },
            });
            expect(result.balanceMXN).toBe(100);
        });
    });
    describe('transferFunds', () => {
        const recipientUser = { id: 'user-2', email: 'recipient@example.com', wallet: { id: 'wallet-2', balanceMXN: 0, balanceAxo: 50 } };
        it('should transfer funds successfully', async () => {
            prisma.user.findUnique.mockResolvedValue(recipientUser);
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(mockWallet);
            const result = await service.transferFunds(mockUser.id, recipientUser.email, 100, 0);
            expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: recipientUser.email }, include: { wallet: true } });
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
            expect(prisma.$transaction).toHaveBeenCalled();
            expect(prisma.wallet.update).toHaveBeenCalledTimes(2);
            expect(prisma.walletTransaction.create).toHaveBeenCalledTimes(2);
            expect(result).toBeDefined();
        });
        it('should throw HttpException if recipient is not found', async () => {
            prisma.user.findUnique.mockResolvedValue(null);
            await expect(service.transferFunds(mockUser.id, 'not-found@example.com', 100, 0)).rejects.toThrow(new common_1.HttpException('Usuario destinatario no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
        it('should throw HttpException if sender wallet is not found', async () => {
            prisma.user.findUnique.mockResolvedValue(recipientUser);
            prisma.wallet.findUnique.mockResolvedValue(null);
            await expect(service.transferFunds(mockUser.id, recipientUser.email, 100, 0)).rejects.toThrow(new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
        it('should throw HttpException for insufficient funds', async () => {
            const poorWallet = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 50 });
            prisma.user.findUnique.mockResolvedValue(recipientUser);
            prisma.wallet.findUnique.mockResolvedValue(poorWallet);
            await expect(service.transferFunds(mockUser.id, recipientUser.email, 100, 0)).rejects.toThrow(new common_1.HttpException('Fondos insuficientes', common_1.HttpStatus.BAD_REQUEST));
        });
    });
    describe('getTransactions', () => {
        it('should return paginated transactions for a wallet', async () => {
            const mockTransactions = [{ id: 'txn-1' }, { id: 'txn-2' }];
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.walletTransaction.findMany.mockResolvedValue(mockTransactions);
            prisma.walletTransaction.count.mockResolvedValue(5);
            const result = await service.getTransactions(mockUser.id, 2, 0);
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
            expect(prisma.walletTransaction.findMany).toHaveBeenCalledWith({
                where: { walletId: mockWallet.id },
                orderBy: { createdAt: 'desc' },
                take: 2,
                skip: 0,
            });
            expect(prisma.walletTransaction.count).toHaveBeenCalledWith({ where: { walletId: mockWallet.id } });
            expect(result.transactions).toEqual(mockTransactions);
            expect(result.pagination).toEqual({
                total: 5,
                limit: 2,
                offset: 0,
                hasMore: true,
            });
        });
        it('should throw HttpException if wallet is not found', async () => {
            prisma.wallet.findUnique.mockResolvedValue(null);
            await expect(service.getTransactions(mockUser.id, 10, 0)).rejects.toThrow(new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
    });
    describe('convertCurrency', () => {
        it('should convert MXN to AXO successfully', async () => {
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(Object.assign(Object.assign({}, mockWallet), { balanceMXN: 900, balanceAxo: 580 }));
            const result = await service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100);
            expect(prisma.wallet.update).toHaveBeenCalled();
            expect(prisma.walletTransaction.create).toHaveBeenCalled();
            expect(result.wallet.balanceMXN).toBe(900);
            expect(result.wallet.balanceAxo).toBe(580);
            expect(result.conversion.to.amount).toBeCloseTo(80);
        });
        it('should convert AXO to MXN successfully', async () => {
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(Object.assign(Object.assign({}, mockWallet), { balanceMXN: 1110, balanceAxo: 400 }));
            const result = await service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100);
            expect(prisma.wallet.update).toHaveBeenCalled();
            expect(prisma.walletTransaction.create).toHaveBeenCalled();
            expect(result.wallet.balanceMXN).toBe(1110);
            expect(result.wallet.balanceAxo).toBe(400);
            expect(result.conversion.to.amount).toBeCloseTo(110);
        });
        it('should throw for insufficient MXN funds', async () => {
            const poorWallet = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 50 });
            prisma.wallet.findUnique.mockResolvedValue(poorWallet);
            await expect(service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100)).rejects.toThrow(new common_1.HttpException('Fondos MXN insuficientes', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw for insufficient AXO funds', async () => {
            const poorWallet = Object.assign(Object.assign({}, mockWallet), { balanceAxo: 50 });
            prisma.wallet.findUnique.mockResolvedValue(poorWallet);
            await expect(service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100)).rejects.toThrow(new common_1.HttpException('Fondos AXO insuficientes', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw for unsupported conversion', async () => {
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            await expect(service.convertCurrency(mockUser.id, 'MXN', 'MXN', 100)).rejects.toThrow(new common_1.HttpException('Conversión no soportada', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw if wallet not found', async () => {
            prisma.wallet.findUnique.mockResolvedValue(null);
            await expect(service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100)).rejects.toThrow(new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
    });
});
//# sourceMappingURL=wallet.service.spec.js.map