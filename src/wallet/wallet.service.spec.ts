import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

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
  let service: WalletService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<WalletService>(WalletService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOrCreateWallet', () => {
    it('should return an existing wallet', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);

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
        const newWallet = { ...mockWallet, balanceAxo: 50, transactions: [] };
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.wallet.create as jest.Mock).mockResolvedValue(newWallet);
        (prisma.walletTransaction.create as jest.Mock).mockResolvedValue({});
  
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
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.getOrCreateWallet('non-existent-user')).rejects.toThrow(
        'User not found: non-existent-user'
      );
    });
  });

  describe('addFunds', () => {
    it('should add funds to an existing wallet', async () => {
      const updatedWalletData = { ...mockWallet, balanceMXN: mockWallet.balanceMXN + 100 };
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.wallet.update as jest.Mock).mockResolvedValue(updatedWalletData);

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
        const newWallet = { ...mockWallet, balanceMXN: 100, balanceAxo: 50 };
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.wallet.create as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 0, balanceAxo: 50 });
        (prisma.wallet.update as jest.Mock).mockResolvedValue(newWallet);
  
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
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(recipientUser);
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.wallet.update as jest.Mock).mockResolvedValue(mockWallet); // Mock the update within transaction

      const result = await service.transferFunds(mockUser.id, recipientUser.email, 100, 0);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: recipientUser.email }, include: { wallet: true } });
      expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.wallet.update).toHaveBeenCalledTimes(2);
      expect(prisma.walletTransaction.create).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    it('should throw HttpException if recipient is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.transferFunds(mockUser.id, 'not-found@example.com', 100, 0)).rejects.toThrow(
        new HttpException('Usuario destinatario no encontrado', HttpStatus.NOT_FOUND)
      );
    });

    it('should throw HttpException if sender wallet is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(recipientUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(service.transferFunds(mockUser.id, recipientUser.email, 100, 0)).rejects.toThrow(
          new HttpException('Wallet no encontrado', HttpStatus.NOT_FOUND)
        );
      });
  
      it('should throw HttpException for insufficient funds', async () => {
        const poorWallet = { ...mockWallet, balanceMXN: 50 };
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(recipientUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(poorWallet);
        await expect(service.transferFunds(mockUser.id, recipientUser.email, 100, 0)).rejects.toThrow(
          new HttpException('Fondos insuficientes', HttpStatus.BAD_REQUEST)
        );
      });
  });

  describe('getTransactions', () => {
    it('should return paginated transactions for a wallet', async () => {
      const mockTransactions = [{ id: 'txn-1' }, { id: 'txn-2' }];
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.walletTransaction.findMany as jest.Mock).mockResolvedValue(mockTransactions);
      (prisma.walletTransaction.count as jest.Mock).mockResolvedValue(5);

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
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.getTransactions(mockUser.id, 10, 0)).rejects.toThrow(
        new HttpException('Wallet no encontrado', HttpStatus.NOT_FOUND)
      );
    });
  });

  describe('convertCurrency', () => {
    it('should convert MXN to AXO successfully', async () => {
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.wallet.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 900, balanceAxo: 580 });

      const result = await service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100);

      expect(prisma.wallet.update).toHaveBeenCalled();
      expect(prisma.walletTransaction.create).toHaveBeenCalled();
      expect(result.wallet.balanceMXN).toBe(900);
      expect(result.wallet.balanceAxo).toBe(580);
      expect(result.conversion.to.amount).toBeCloseTo(80);
    });

    it('should convert AXO to MXN successfully', async () => {
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
        (prisma.wallet.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 1110, balanceAxo: 400 });
  
        const result = await service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100);
  
        expect(prisma.wallet.update).toHaveBeenCalled();
        expect(prisma.walletTransaction.create).toHaveBeenCalled();
        expect(result.wallet.balanceMXN).toBe(1110);
        expect(result.wallet.balanceAxo).toBe(400);
        expect(result.conversion.to.amount).toBeCloseTo(110);
      });

    it('should throw for insufficient MXN funds', async () => {
      const poorWallet = { ...mockWallet, balanceMXN: 50 };
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(poorWallet);
      await expect(service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100)).rejects.toThrow(
        new HttpException('Fondos MXN insuficientes', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw for insufficient AXO funds', async () => {
        const poorWallet = { ...mockWallet, balanceAxo: 50 };
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(poorWallet);
        await expect(service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100)).rejects.toThrow(
          new HttpException('Fondos AXO insuficientes', HttpStatus.BAD_REQUEST)
        );
      });

    it('should throw for unsupported conversion', async () => {
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      await expect(service.convertCurrency(mockUser.id, 'MXN', 'MXN', 100)).rejects.toThrow(
        new HttpException('Conversión no soportada', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw if wallet not found', async () => {
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100)).rejects.toThrow(
          new HttpException('Wallet no encontrado', HttpStatus.NOT_FOUND)
        );
      });
  });
});