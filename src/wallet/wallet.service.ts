import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateWallet(userId: string) {
    console.log('🔄 Service: Getting or creating wallet for user:', userId);
    
    // Primero verificar que el usuario existe
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
      // Removed include as 'transactions' field doesn't exist on Wallet model
    });

    if (!wallet) {
      console.log('🆕 Service: Creating new wallet for user:', userId);
      // Generate a unique ID for the wallet
      const walletId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      wallet = await this.prisma.wallet.create({
        data: {
          id: walletId,
          userId,
          balanceMXN: 0,
          balanceAxo: 50, // Regalo inicial
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Crear transacción de regalo inicial
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
    } else {
      console.log('✅ Service: Existing wallet found');
    }

    return wallet;
  }

  async addFunds(
    userId: string,
    amountMXN: number,
    amountAxo: number,
    description?: string,
    paymentMethod?: string
  ) {
    let wallet = await this.prisma.wallet.findUnique({
      where: { userId }
    });

    if (!wallet) {
      // Generate a unique ID for the wallet
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

    // Generate a unique ID for the transaction
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

  async transferFunds(
    userId: string,
    recipientEmail: string,
    amountMXN: number,
    amountAxo: number,
    description?: string
  ) {
    // Buscar destinatario
    const recipient = await this.prisma.users.findUnique({
      where: { email: recipientEmail }
      // Removed include as 'wallet' field doesn't exist on User model
    });

    if (!recipient) {
      throw new HttpException(
        'Usuario destinatario no encontrado',
        HttpStatus.NOT_FOUND
      );
    }

    // Obtener wallet del remitente
    const senderWallet = await this.prisma.wallet.findUnique({
      where: { userId }
    });

    if (!senderWallet) {
      throw new HttpException(
        'Wallet no encontrado',
        HttpStatus.NOT_FOUND
      );
    }

    // Verificar fondos suficientes
    if ((amountMXN > 0 && senderWallet.balanceMXN < amountMXN) || 
        (amountAxo > 0 && senderWallet.balanceAxo < amountAxo)) {
      throw new HttpException(
        'Fondos insuficientes',
        HttpStatus.BAD_REQUEST
      );
    }

    // Crear o obtener wallet del destinatario
    let recipientWallet = await this.prisma.wallet.findUnique({
      where: { userId: recipient.id }
    });
    
    if (!recipientWallet) {
      // Generate a unique ID for the wallet
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

    // Realizar transferencia en transacción
    const result = await this.prisma.$transaction(async (tx: any) => {
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
        where: { id: recipientWallet!.id },
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

      // Crear transacciones
      // Generate unique IDs for the transactions
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
          walletId: recipientWallet!.id,
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

  async getTransactions(userId: string, limit: number, offset: number) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId }
    });

    if (!wallet) {
      throw new HttpException(
        'Wallet no encontrado',
        HttpStatus.NOT_FOUND
      );
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

  async convertCurrency(
    userId: string,
    fromCurrency: 'MXN' | 'AXO',
    toCurrency: 'MXN' | 'AXO',
    amount: number
  ) {
    const MXN_TO_AXO_RATE = 0.8; // 20% descuento
    const AXO_TO_MXN_RATE = 1.1;  // 10% premium

    const wallet = await this.prisma.wallet.findUnique({
      where: { userId }
    });

    if (!wallet) {
      throw new HttpException(
        'Wallet no encontrado',
        HttpStatus.NOT_FOUND
      );
    }

    let convertedAmount: number;
    let fromAmount: number;
    let toAmount: number;

    if (fromCurrency === 'MXN' && toCurrency === 'AXO') {
      if (wallet.balanceMXN < amount) {
        throw new HttpException(
          'Fondos MXN insuficientes',
          HttpStatus.BAD_REQUEST
        );
      }
      convertedAmount = amount * MXN_TO_AXO_RATE;
      fromAmount = -amount;
      toAmount = convertedAmount;
    } else if (fromCurrency === 'AXO' && toCurrency === 'MXN') {
      if (wallet.balanceAxo < amount) {
        throw new HttpException(
          'Fondos AXO insuficientes',
          HttpStatus.BAD_REQUEST
        );
      }
      convertedAmount = amount * AXO_TO_MXN_RATE;
      fromAmount = -amount;
      toAmount = convertedAmount;
    } else {
      throw new HttpException(
        'Conversión no soportada',
        HttpStatus.BAD_REQUEST
      );
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

    // Generate a unique ID for the transaction
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
}
