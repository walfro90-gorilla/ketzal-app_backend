import { Test, TestingModule } from '@nestjs/testing';
import { WalletService } from './wallet.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mock data
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

// Mock PrismaService
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

  // Test suite for getOrCreateWallet
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

    it('should create a new wallet with a welcome bonus if one does not exist', async () => {
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

  // Test suite for addFunds
  describe('addFunds', () => {
    it('should add only MXN funds to an existing wallet', async () => {
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
      expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({ description: 'Test Deposit' })
      }));
      expect(result).toEqual(updatedWalletData);
    });

    it('should add only AXO funds to an existing wallet', async () => {
        const updatedWalletData = { ...mockWallet, balanceAxo: mockWallet.balanceAxo + 50 };
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
        (prisma.wallet.update as jest.Mock).mockResolvedValue(updatedWalletData);
  
        const result = await service.addFunds(mockUser.id, 0, 50);
  
        expect(prisma.wallet.update).toHaveBeenCalledWith({
          where: { id: mockWallet.id },
          data: {
            balanceMXN: { increment: 0 },
            balanceAxo: { increment: 50 },
          },
        });
        expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
          data: expect.objectContaining({ description: 'Depósito de 50 AXO' })
        }));
        expect(result).toEqual(updatedWalletData);
      });

      it('should add both MXN and AXO funds and create correct transaction description', async () => {
        const updatedWalletData = { ...mockWallet, balanceMXN: 1100, balanceAxo: 550 };
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
        (prisma.wallet.update as jest.Mock).mockResolvedValue(updatedWalletData);
    
        const result = await service.addFunds(mockUser.id, 100, 50);
    
        expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
          data: expect.objectContaining({ description: 'Depósito de $100 MXN y 50 AXO' })
        }));
        expect(result).toEqual(updatedWalletData);
      });

    it('should create a wallet if it does not exist and then add funds', async () => {
        const newWallet = { ...mockWallet, balanceMXN: 100, balanceAxo: 50 };
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.wallet.create as jest.Mock).mockResolvedValue(newWallet);
        (prisma.wallet.update as jest.Mock).mockResolvedValue(newWallet); // This call is now important
  
        const result = await service.addFunds(mockUser.id, 100, 50, 'Initial Deposit');
  
        expect(prisma.wallet.create).toHaveBeenCalledWith({
          data: { userId: mockUser.id, balanceMXN: 100, balanceAxo: 50 },
        });
        // In this scenario, the service creates the wallet and then immediately updates it.
        // Let's ensure the update is called correctly after creation.
        expect(prisma.wallet.update).toHaveBeenCalledWith({
            where: { id: newWallet.id },
            data: {
              balanceMXN: { increment: 100 },
              balanceAxo: { increment: 50 },
            },
          });
        expect(result.balanceMXN).toBe(100);
        expect(result.balanceAxo).toBe(50);
      });
  });

  // Test suite for transferFunds
  describe('transferFunds', () => {
    it('should transfer funds successfully to a user with a wallet', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.wallet.update as jest.Mock).mockResolvedValue(mockWallet); 

      const result = await service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 50);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: mockRecipientUser.email }, include: { wallet: true } });
      expect(prisma.wallet.findUnique).toHaveBeenCalledWith({ where: { userId: mockUser.id } });
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.wallet.update).toHaveBeenCalledTimes(2);
      expect(prisma.walletTransaction.create).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
    });

    it('should create a wallet for the recipient if it does not exist during transfer', async () => {
        const recipientWithoutWallet = { ...mockRecipientUser, wallet: null };
        const newRecipientWallet = { id: 'new-wallet-2', userId: recipientWithoutWallet.id, balanceMXN: 0, balanceAxo: 50 };
        
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(recipientWithoutWallet);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
        (prisma.wallet.create as jest.Mock).mockResolvedValue(newRecipientWallet);
        (prisma.wallet.update as jest.Mock).mockImplementation((args) => {
            if (args.where.id === mockWallet.id) return { ...mockWallet, balanceMXN: 900 };
            if (args.where.id === newRecipientWallet.id) return { ...newRecipientWallet, balanceMXN: 100 };
            return {};
        });

        await service.transferFunds(mockUser.id, recipientWithoutWallet.email, 100, 0);

        expect(prisma.wallet.create).toHaveBeenCalledWith({
            data: { userId: recipientWithoutWallet.id, balanceMXN: 0, balanceAxo: 50 }
        });
        expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should throw HttpException if recipient is not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      await expect(service.transferFunds(mockUser.id, 'not-found@example.com', 100, 0)).rejects.toThrow(
        new HttpException('Usuario destinatario no encontrado', HttpStatus.NOT_FOUND)
      );
    });

    it('should throw HttpException if sender wallet is not found', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(null);
        await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 0)).rejects.toThrow(
          new HttpException('Wallet no encontrado', HttpStatus.NOT_FOUND)
        );
      });
  
      it('should throw HttpException for insufficient MXN funds', async () => {
        const poorWallet = { ...mockWallet, balanceMXN: 50 };
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(poorWallet);
        await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 100, 0)).rejects.toThrow(
          new HttpException('Fondos insuficientes', HttpStatus.BAD_REQUEST)
        );
      });

      it('should throw HttpException for insufficient AXO funds', async () => {
        const poorWallet = { ...mockWallet, balanceAxo: 20 };
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockRecipientUser);
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(poorWallet);
        await expect(service.transferFunds(mockUser.id, mockRecipientUser.email, 0, 50)).rejects.toThrow(
          new HttpException('Fondos insuficientes', HttpStatus.BAD_REQUEST)
        );
      });
  });

  // Test suite for getTransactions
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

  // Test suite for convertCurrency
  describe('convertCurrency', () => {
    it('should convert MXN to AXO successfully and create a transaction', async () => {
      (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
      (prisma.wallet.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 900, balanceAxo: 580 });

      const result = await service.convertCurrency(mockUser.id, 'MXN', 'AXO', 100);

      expect(prisma.wallet.update).toHaveBeenCalledWith(expect.objectContaining({
          data: { balanceMXN: { increment: -100 }, balanceAxo: { increment: 80 } }
      }));
      expect(prisma.walletTransaction.create).toHaveBeenCalledWith(expect.objectContaining({
          data: {
              walletId: mockWallet.id,
              type: 'DEPOSIT',
              amountMXN: -100,
              amountAxo: 80,
              description: 'Conversión: 100 MXN → 80.00 AXO',
              reference: 'CURRENCY_CONVERSION'
          }
      }));
      expect(result.wallet.balanceMXN).toBe(900);
      expect(result.wallet.balanceAxo).toBe(580);
      expect(result.conversion.to.amount).toBeCloseTo(80);
    });

    it('should convert AXO to MXN successfully and create a transaction', async () => {
        (prisma.wallet.findUnique as jest.Mock).mockResolvedValue(mockWallet);
        (prisma.wallet.update as jest.Mock).mockResolvedValue({ ...mockWallet, balanceMXN: 1110, balanceAxo: 400 });
  
        const result = await service.convertCurrency(mockUser.id, 'AXO', 'MXN', 100);
  
        const updateCall = (prisma.wallet.update as jest.Mock).mock.calls[0][0];
        expect(updateCall.data.balanceAxo.increment).toBe(-100);
        expect(updateCall.data.balanceMXN.increment).toBeCloseTo(110);
                const transactionCall = (prisma.walletTransaction.create as jest.Mock).mock.calls[0][0];
        expect(transactionCall.data.amountAxo).toBe(-100);
        expect(transactionCall.data.amountMXN).toBeCloseTo(110);
        expect(transactionCall.data.description).toBe('Conversión: 100 AXO → 110.00 MXN');
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
