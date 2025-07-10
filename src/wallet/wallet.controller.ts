import { Controller, Get, Post, Body, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { WalletService } from './wallet.service';

export interface AddFundsDto {
  amountMXN?: number;
  amountAxo?: number;
  description?: string;
  paymentMethod?: string;
}

export interface TransferFundsDto {
  recipientEmail: string;
  amountMXN?: number;
  amountAxo?: number;
  description?: string;
}

export interface ConvertCurrencyDto {
  fromCurrency: 'MXN' | 'AXO';
  toCurrency: 'MXN' | 'AXO';
  amount: number;
}

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId')
  async getWallet(@Param('userId') userId: string) {
    try {
      console.log('🔄 Backend: Getting wallet for user:', userId);
      const wallet = await this.walletService.getOrCreateWallet(userId);
      console.log('✅ Backend: Wallet retrieved successfully for user:', userId);
      return {
        success: true,
        wallet
      };
    } catch (error) {
      console.error('❌ Backend: Error getting wallet for user:', userId, error);
      
      // Si es un error de que el usuario no existe
      if ((error as any)?.code === 'P2025' || (error as any)?.message?.includes('User not found')) {
        throw new HttpException(
          'Usuario no encontrado en la base de datos',
          HttpStatus.NOT_FOUND
        );
      }
      
      throw new HttpException(
        `Error al obtener wallet: ${(error as any)?.message || 'Error desconocido'}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':userId/add-funds')
  async addFunds(
    @Param('userId') userId: string,
    @Body() addFundsDto: AddFundsDto
  ) {
    try {
      const { amountMXN, amountAxo, description, paymentMethod } = addFundsDto;

      // Validaciones
      if (!amountMXN && !amountAxo) {
        throw new HttpException(
          'Debe especificar una cantidad',
          HttpStatus.BAD_REQUEST
        );
      }

      if ((amountMXN && amountMXN <= 0) || (amountAxo && amountAxo <= 0)) {
        throw new HttpException(
          'La cantidad debe ser mayor a 0',
          HttpStatus.BAD_REQUEST
        );
      }

      const wallet = await this.walletService.addFunds(
        userId,
        amountMXN || 0,
        amountAxo || 0,
        description,
        paymentMethod
      );

      return {
        success: true,
        wallet,
        message: 'Fondos agregados exitosamente'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al agregar fondos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':userId/transfer')
  async transferFunds(
    @Param('userId') userId: string,
    @Body() transferDto: TransferFundsDto
  ) {
    try {
      const { recipientEmail, amountMXN, amountAxo, description } = transferDto;

      // Validaciones
      if (!recipientEmail) {
        throw new HttpException(
          'Email del destinatario requerido',
          HttpStatus.BAD_REQUEST
        );
      }

      if (!amountMXN && !amountAxo) {
        throw new HttpException(
          'Debe especificar una cantidad',
          HttpStatus.BAD_REQUEST
        );
      }

      const wallet = await this.walletService.transferFunds(
        userId,
        recipientEmail,
        amountMXN || 0,
        amountAxo || 0,
        description
      );

      return {
        success: true,
        wallet,
        message: 'Transferencia realizada exitosamente'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al transferir fondos',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':userId/transactions')
  async getTransactions(
    @Param('userId') userId: string,
    @Query('limit') limit: string = '20',
    @Query('offset') offset: string = '0'
  ) {
    try {
      const transactions = await this.walletService.getTransactions(
        userId,
        Number(limit),
        Number(offset)
      );

      return {
        success: true,
        ...transactions
      };
    } catch (error) {
      throw new HttpException(
        'Error al obtener transacciones',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post(':userId/convert')
  async convertCurrency(
    @Param('userId') userId: string,
    @Body() convertDto: ConvertCurrencyDto
  ) {
    try {
      const { fromCurrency, toCurrency, amount } = convertDto;

      if (fromCurrency === toCurrency) {
        throw new HttpException(
          'Las monedas deben ser diferentes',
          HttpStatus.BAD_REQUEST
        );
      }

      const result = await this.walletService.convertCurrency(
        userId,
        fromCurrency,
        toCurrency,
        amount
      );

      return {
        success: true,
        ...result,
        message: 'Conversión realizada exitosamente'
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error al convertir moneda',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
