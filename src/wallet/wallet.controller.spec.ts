import { Test, TestingModule } from '@nestjs/testing';
import { WalletController, AddFundsDto, TransferFundsDto, ConvertCurrencyDto } from './wallet.controller';
import { WalletService } from './wallet.service';
import { HttpException, HttpStatus } from '@nestjs/common';

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
  let controller: WalletController;
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: WalletService,
          useValue: mockWalletService,
        },
      ],
    }).compile();

    controller = module.get<WalletController>(WalletController);
    service = module.get<WalletService>(WalletService);
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
      (service.getOrCreateWallet as jest.Mock).mockRejectedValue(new Error('User not found: non-existent-user'));
      await expect(controller.getWallet(userId)).rejects.toThrow(
        new HttpException('Usuario no encontrado en la base de datos', HttpStatus.NOT_FOUND)
      );
    });

    it('should throw HttpException for other errors', async () => {
      const userId = 'user-1';
      (service.getOrCreateWallet as jest.Mock).mockRejectedValue(new Error('Some other error'));
      await expect(controller.getWallet(userId)).rejects.toThrow(
        new HttpException('Error al obtener wallet: Some other error', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('addFunds', () => {
    it('should add funds successfully', async () => {
      const userId = 'user-1';
      const addFundsDto: AddFundsDto = { amountMXN: 100, amountAxo: 0 };
      const expectedResult = { success: true, wallet: mockWallet, message: 'Fondos agregados exitosamente' };
      (service.addFunds as jest.Mock).mockResolvedValue(mockWallet);

      const result = await controller.addFunds(userId, addFundsDto);

      expect(service.addFunds).toHaveBeenCalledWith(userId, 100, 0, undefined, undefined);
      expect(result).toEqual(expectedResult);
    });

    it('should throw HttpException if no amount is specified', async () => {
      const userId = 'user-1';
      const addFundsDto: AddFundsDto = {};
      await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(
        new HttpException('Debe especificar una cantidad', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw HttpException if amount is zero or less', async () => {
      const userId = 'user-1';
      const addFundsDto: AddFundsDto = { amountMXN: 0, amountAxo: 0 };
      await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(
        new HttpException('Debe especificar una cantidad', HttpStatus.BAD_REQUEST) // Corrected expected message
      );
    });

    it('should throw HttpException for other service errors', async () => {
      const userId = 'user-1';
      const addFundsDto: AddFundsDto = { amountMXN: 100 };
      (service.addFunds as jest.Mock).mockRejectedValue(new Error('Service error'));
      await expect(controller.addFunds(userId, addFundsDto)).rejects.toThrow(
        new HttpException('Error al agregar fondos', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('transferFunds', () => {
    it('should transfer funds successfully', async () => {
      const userId = 'user-1';
      const transferDto: TransferFundsDto = { recipientEmail: 'recipient@example.com', amountMXN: 100, amountAxo: 0 };
      const expectedResult = { success: true, wallet: mockWallet, message: 'Transferencia realizada exitosamente' };
      (service.transferFunds as jest.Mock).mockResolvedValue(mockWallet);

      const result = await controller.transferFunds(userId, transferDto);

      expect(service.transferFunds).toHaveBeenCalledWith(userId, transferDto.recipientEmail, 100, 0, undefined);
      expect(result).toEqual(expectedResult);
    });

    it('should throw HttpException if recipient email is missing', async () => {
      const userId = 'user-1';
      const transferDto: TransferFundsDto = { recipientEmail: '', amountMXN: 100 }; // Corrected to provide empty string
      await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(
        new HttpException('Email del destinatario requerido', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw HttpException if no amount is specified', async () => {
      const userId = 'user-1';
      const transferDto: TransferFundsDto = { recipientEmail: 'recipient@example.com' };
      await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(
        new HttpException('Debe especificar una cantidad', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw HttpException for other service errors', async () => {
      const userId = 'user-1';
      const transferDto: TransferFundsDto = { recipientEmail: 'recipient@example.com', amountMXN: 100 };
      (service.transferFunds as jest.Mock).mockRejectedValue(new Error('Service error'));
      await expect(controller.transferFunds(userId, transferDto)).rejects.toThrow(
        new HttpException('Error al transferir fondos', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('getTransactions', () => {
    it('should return transactions successfully', async () => {
      const userId = 'user-1';
      const mockTransactions = { transactions: [{ id: 'txn-1' }], pagination: { total: 1, limit: 10, offset: 0, hasMore: false } };
      (service.getTransactions as jest.Mock).mockResolvedValue(mockTransactions);

      const result = await controller.getTransactions(userId, '10', '0');

      expect(service.getTransactions).toHaveBeenCalledWith(userId, 10, 0);
      expect(result).toEqual({ success: true, ...mockTransactions });
    });

    it('should throw HttpException for service errors', async () => {
      const userId = 'user-1';
      (service.getTransactions as jest.Mock).mockRejectedValue(new Error('Service error'));
      await expect(controller.getTransactions(userId, '10', '0')).rejects.toThrow(
        new HttpException('Error al obtener transacciones', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });

  describe('convertCurrency', () => {
    it('should convert currency successfully', async () => {
      const userId = 'user-1';
      const convertDto: ConvertCurrencyDto = { fromCurrency: 'MXN', toCurrency: 'AXO', amount: 100 };
      const mockConversionResult = { wallet: mockWallet, conversion: { from: { currency: 'MXN', amount: 100 }, to: { currency: 'AXO', amount: 80 }, rate: 0.8 } };
      const expectedResult = { success: true, ...mockConversionResult, message: 'Conversión realizada exitosamente' };
      (service.convertCurrency as jest.Mock).mockResolvedValue(mockConversionResult);

      const result = await controller.convertCurrency(userId, convertDto);

      expect(service.convertCurrency).toHaveBeenCalledWith(userId, 'MXN', 'AXO', 100);
      expect(result).toEqual(expectedResult);
    });

    it('should throw HttpException if fromCurrency and toCurrency are the same', async () => {
      const userId = 'user-1';
      const convertDto: ConvertCurrencyDto = { fromCurrency: 'MXN', toCurrency: 'MXN', amount: 100 };
      await expect(controller.convertCurrency(userId, convertDto)).rejects.toThrow(
        new HttpException('Las monedas deben ser diferentes', HttpStatus.BAD_REQUEST)
      );
    });

    it('should throw HttpException for other service errors', async () => {
      const userId = 'user-1';
      const convertDto: ConvertCurrencyDto = { fromCurrency: 'MXN', toCurrency: 'AXO', amount: 100 };
      (service.convertCurrency as jest.Mock).mockRejectedValue(new Error('Service error'));
      await expect(controller.convertCurrency(userId, convertDto)).rejects.toThrow(
        new HttpException('Error al convertir moneda', HttpStatus.INTERNAL_SERVER_ERROR)
      );
    });
  });
});
