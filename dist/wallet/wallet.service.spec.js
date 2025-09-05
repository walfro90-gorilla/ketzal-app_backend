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
const mockRecipientUser = {
    id: 'user-2',
    email: 'recipient@example.com',
    name: 'Recipient User',
    wallet: { id: 'wallet-2', balanceMXN: 0, balanceAxo: 50 }
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
            prisma.users.findUnique.mockResolvedValue(mockUser);
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            const result = await service.getOrCreateWallet(mockUser.id);
            expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { id: mockUser.id } });
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({
                where: { userId: mockUser.id },
            });
            expect(result).toEqual(mockWallet);
            expect(prisma.wallet.create).not.toHaveBeenCalled();
        });
        it('should create a new wallet with a welcome bonus if one does not exist', async () => {
            const newWallet = Object.assign(Object.assign({}, mockWallet), { balanceAxo: 50 });
            prisma.users.findUnique.mockResolvedValue(mockUser);
            prisma.wallet.findUnique.mockResolvedValue(null);
            prisma.wallet.create.mockResolvedValue(newWallet);
            prisma.walletTransaction.create.mockResolvedValue({});
            const result = await service.getOrCreateWallet(mockUser.id);
            expect(prisma.wallet.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    userId: mockUser.id,
                    balanceMXN: 0,
                    balanceAxo: 50,
                }),
            }));
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    walletId: newWallet.id,
                    type: 'REWARD',
                    amountAxo: 50,
                    description: '🎉 Regalo de bienvenida - 50 AXO Coins',
                    reference: 'WELCOME_BONUS',
                }),
            }));
            expect(result).toEqual(newWallet);
        });
        it('should throw an error if the user does not exist', async () => {
            prisma.users.findUnique.mockResolvedValue(null);
            await expect(service.getOrCreateWallet('non-existent-user')).rejects.toThrow('User not found: non-existent-user');
        });
    });
    describe('addFunds', () => {
        it('should add only MXN funds to an existing wallet', async () => {
            const updatedWalletData = Object.assign(Object.assign({}, mockWallet), { balanceMXN: mockWallet.balanceMXN + 100 });
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(updatedWalletData);
            const result = await service.addFunds(mockUser.id, 100, 0, 'Test Deposit');
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
            expect(prisma.wallet.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: mockWallet.id },
                data: expect.objectContaining({
                    balanceMXN: { increment: 100 },
                    balanceAxo: { increment: 0 },
                }),
            }));
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    description: 'Test Deposit',
                    amountMXN: 100,
                    amountAxo: null
                })
            }));
            expect(result).toEqual(updatedWalletData);
        });
        it('should add only AXO funds to an existing wallet', async () => {
            const updatedWalletData = Object.assign(Object.assign({}, mockWallet), { balanceAxo: mockWallet.balanceAxo + 50 });
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(updatedWalletData);
            const result = await service.addFunds(mockUser.id, 0, 50);
            expect(prisma.wallet.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: mockWallet.id },
                data: expect.objectContaining({
                    balanceMXN: { increment: 0 },
                    balanceAxo: { increment: 50 },
                }),
            }));
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    description: 'Depósito de 50 AXO',
                    amountMXN: null,
                    amountAxo: 50
                })
            }));
            expect(result).toEqual(updatedWalletData);
        });
        it('should add both MXN and AXO funds and create correct transaction description', async () => {
            const updatedWalletData = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 1100, balanceAxo: 550 });
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(updatedWalletData);
            const result = await service.addFunds(mockUser.id, 100, 50);
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    description: 'Depósito de 100 MXN y 50 AXO',
                    amountMXN: 100,
                    amountAxo: 50
                })
            }));
            expect(result).toEqual(updatedWalletData);
        });
        it('should create a wallet if it does not exist and then add funds', async () => {
            const newWallet = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 100, balanceAxo: 50 });
            prisma.wallet.findUnique.mockResolvedValue(null);
            prisma.wallet.create.mockResolvedValue(newWallet);
            prisma.wallet.update.mockResolvedValue(newWallet);
            const result = await service.addFunds(mockUser.id, 100, 50, 'Initial Deposit');
            expect(prisma.wallet.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    userId: mockUser.id,
                    balanceMXN: 100,
                    balanceAxo: 50,
                }),
            }));
            expect(prisma.wallet.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: newWallet.id },
                data: expect.objectContaining({
                    balanceMXN: { increment: 100 },
                    balanceAxo: { increment: 50 },
                }),
            }));
            expect(result.balanceMXN).toBe(100);
            expect(result.balanceAxo).toBe(50);
        });
    });
    describe('transferFunds', () => {
        it('should transfer funds successfully to a user with a wallet', async () => {
            prisma.users.findUnique.mockResolvedValue(mockRecipientUser);
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(mockWallet);
            const result = await service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 50);
            expect(prisma.users.findUnique).toHaveBeenCalledWith({ where: { email: mockRecipientUser.email } });
            expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
            expect(prisma.$transaction).toHaveBeenCalled();
            expect(prisma.wallet.update).toHaveBeenCalledTimes(2);
            expect(prisma.walletTransaction.create).toHaveBeenCalledTimes(2);
            expect(result).toBeDefined();
        });
        it('should create a wallet for the recipient if it does not exist during transfer', async () => {
            const recipientWithoutWallet = Object.assign({}, mockRecipientUser);
            const newRecipientWallet = { id: 'new-wallet-2', userId: recipientWithoutWallet.id, balanceMXN: 0, balanceAxo: 50 };
            prisma.users.findUnique.mockResolvedValue(recipientWithoutWallet);
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.findUnique.mockResolvedValueOnce(mockWallet).mockResolvedValueOnce(null);
            prisma.wallet.create.mockResolvedValue(newRecipientWallet);
            prisma.wallet.update.mockImplementation((args) => {
                if (args.where.id === mockWallet.id)
                    return Object.assign(Object.assign({}, mockWallet), { balanceMXN: 900 });
                if (args.where.id === newRecipientWallet.id)
                    return Object.assign(Object.assign({}, newRecipientWallet), { balanceMXN: 100 });
                return {};
            });
            await service.transferFunds(mockUser.id, recipientWithoutWallet.email, 100, 0);
            expect(prisma.wallet.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    userId: recipientWithoutWallet.id,
                    balanceMXN: 0,
                    balanceAxo: 50,
                }),
            }));
            expect(prisma.$transaction).toHaveBeenCalled();
        });
        it('should throw HttpException if recipient is not found', async () => {
            prisma.users.findUnique.mockResolvedValue(null);
            await expect(service.transferFunds(mockUser.id, 'not-found@example.com', 100, 0)).rejects.toThrow(new common_1.HttpException('Usuario destinatario no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
        it('should throw HttpException if sender wallet is not found', async () => {
            prisma.users.findUnique.mockResolvedValue(mockRecipientUser);
            prisma.wallet.findUnique.mockResolvedValue(null);
            await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 0)).rejects.toThrow(new common_1.HttpException('Wallet no encontrado', common_1.HttpStatus.NOT_FOUND));
        });
        it('should throw HttpException for insufficient MXN funds', async () => {
            const poorWallet = Object.assign(Object.assign({}, mockWallet), { balanceMXN: 50 });
            prisma.users.findUnique.mockResolvedValue(mockRecipientUser);
            prisma.wallet.findUnique.mockResolvedValue(poorWallet);
            await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 0)).rejects.toThrow(new common_1.HttpException('Fondos insuficientes', common_1.HttpStatus.BAD_REQUEST));
        });
        it('should throw HttpException for insufficient AXO funds', async () => {
            const poorWallet = Object.assign(Object.assign({}, mockWallet), { balanceAxo: 20 });
            prisma.users.findUnique.mockResolvedValue(mockRecipientUser);
            prisma.wallet.findUnique.mockResolvedValue(poorWallet);
            await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 0, 50)).rejects.toThrow(new common_1.HttpException('Fondos insuficientes', common_1.HttpStatus.BAD_REQUEST));
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
        it('should convert MXN to AXO successfully and create a transaction', async () => {
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(Object.assign(Object.assign({}, mockWallet), { balanceMXN: 900, balanceAxo: 580 }));
            const result = await service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100);
            expect(prisma.wallet.update).toHaveBeenCalledWith(expect.objectContaining({
                where: { id: mockWallet.id },
                data: expect.objectContaining({
                    balanceMXN: { increment: -100 },
                    balanceAxo: { increment: 80 },
                }),
            }));
            expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({
                    walletId: mockWallet.id,
                    type: 'DEPOSIT',
                    amountMXN: -100,
                    amountAxo: 80,
                    description: 'Conversión: 100 MXN → 80.00 AXO',
                    reference: 'CURRENCY_CONVERSION'
                })
            }));
            expect(result.wallet.balanceMXN).toBe(900);
            expect(result.wallet.balanceAxo).toBe(580);
            expect(result.conversion.to.amount).toBeCloseTo(80);
        });
        it('should convert AXO to MXN successfully and create a transaction', async () => {
            prisma.wallet.findUnique.mockResolvedValue(mockWallet);
            prisma.wallet.update.mockResolvedValue(Object.assign(Object.assign({}, mockWallet), { balanceMXN: 1110, balanceAxo: 400 }));
            const result = await service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100);
            const updateCall = prisma.wallet.update.mock.calls[0][0];
            expect(updateCall.data.balanceAxo.increment).toBe(-100);
            expect(updateCall.data.balanceMXN.increment).toBeCloseTo(110);
            const transactionCall = prisma.walletTransaction.create.mock.calls[0][0];
            expect(transactionCall.data.amountAxo).toBe(-100);
            expect(transactionCall.data.amountMXN).toBeCloseTo(110);
            expect(transactionCall.data.description).toBe('Conversión: 100 AXO → 110.00 MXN');
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