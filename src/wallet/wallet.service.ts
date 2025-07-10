import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateWallet(userId: string) {
    console.log('🔄 Service: Getting or creating wallet for user:', userId);
    
    // Primero verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      console.error('❌ Service: User not found:', userId);
      throw new Error(`User not found: ${userId}`);
    }
    
    console.log('✅ Service: User found:', user.email);
    
    let wallet = await this.prisma.wallet.findUnique({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!wallet) {
      console.log('🆕 Service: Creating new wallet for user:', userId);
      wallet = await this.prisma.wallet.create({
        data: {
          userId,
          balanceMXN: 0,
          balanceAxo: 50 // Regalo inicial
        },
        include: {
          transactions: true
        }
      });

      // Crear transacción de regalo inicial
      await this.prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'REWARD',
          amountAxo: 50,
          description: '🎉 Regalo de bienvenida - 50 AXO Coins',
          reference: 'WELCOME_BONUS'
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
      wallet = await this.prisma.wallet.create({
        data: {
          userId,
          balanceMXN: 0,
          balanceAxo: 50
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
        }
      }
    });

    await this.prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'DEPOSIT',
        amountMXN: amountMXN > 0 ? amountMXN : null,
        amountAxo: amountAxo > 0 ? amountAxo : null,
        description: description || `Depósito de ${amountMXN > 0 ? `$${amountMXN} MXN` : ''}${amountMXN > 0 && amountAxo > 0 ? ' y ' : ''}${amountAxo > 0 ? `${amountAxo} AXO` : ''}`,
        reference: paymentMethod || 'MANUAL'
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
    const recipient = await this.prisma.user.findUnique({
      where: { email: recipientEmail },
      include: { wallet: true }
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
    let recipientWallet = recipient.wallet;
    if (!recipientWallet) {
      recipientWallet = await this.prisma.wallet.create({
        data: {
          userId: recipient.id,
          balanceMXN: 0,
          balanceAxo: 50
        }
      });
    }

    // Realizar transferencia en transacción
    const result = await this.prisma.$transaction(async (tx) => {
      const updatedSenderWallet = await tx.wallet.update({
        where: { id: senderWallet.id },
        data: {
          balanceMXN: {
            decrement: amountMXN
          },
          balanceAxo: {
            decrement: amountAxo
          }
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
          }
        }
      });

      // Crear transacciones
      await tx.walletTransaction.create({
        data: {
          walletId: senderWallet.id,
          type: 'TRANSFER_SENT',
          amountMXN: amountMXN > 0 ? -amountMXN : null,
          amountAxo: amountAxo > 0 ? -amountAxo : null,
          description: description || `Transferencia a ${recipient.email}`,
          reference: recipient.id
        }
      });

      await tx.walletTransaction.create({
        data: {
          walletId: recipientWallet!.id,
          type: 'TRANSFER_RECEIVED',
          amountMXN: amountMXN > 0 ? amountMXN : null,
          amountAxo: amountAxo > 0 ? amountAxo : null,
          description: description || `Transferencia de ${userId}`,
          reference: userId
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
        }
      }
    });

    await this.prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        type: 'DEPOSIT',
        amountMXN: fromCurrency === 'MXN' ? fromAmount : toAmount,
        amountAxo: fromCurrency === 'AXO' ? fromAmount : toAmount,
        description: `Conversión: ${amount} ${fromCurrency} → ${convertedAmount.toFixed(2)} ${toCurrency}`,
        reference: 'CURRENCY_CONVERSION'
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
