import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('test')
export class TestController {
  constructor(private prisma: PrismaService) {}

  @Post('create-test-user')
  async createTestUser() {
    try {
      // Crear usuario de prueba
      const user = await this.prisma.users.upsert({
        where: { email: 'test@ketzal.com' },
        update: {},
        create: {
          email: 'test@ketzal.com',
          name: 'Usuario de Prueba',
          password: 'hashedpassword123',
          role: 'user',
          referralCode: 'TEST123',
          axoCoinsEarned: 50
        },
      });

      // Crear wallet para el usuario
      const wallet = await this.prisma.wallets.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          balanceMXN: 1000.0,
          balanceAxo: 500.0,
        },
      });

      // Crear algunas transacciones de ejemplo
      const transactions = await Promise.all([
        this.prisma.wallet_transactions.create({
          data: {
            walletId: wallet.id,
            type: 'DEPOSIT',
            amountMXN: 1000.0,
            description: 'Depósito inicial de bienvenida',
            reference: 'WELCOME-001',
          },
        }),
        this.prisma.wallet_transactions.create({
          data: {
            walletId: wallet.id,
            type: 'REWARD',
            amountAxo: 500.0,
            description: 'Recompensa por registro',
            reference: 'REWARD-001',
          },
        }),
        this.prisma.wallet_transactions.create({
          data: {
            walletId: wallet.id,
            type: 'PURCHASE',
            amountMXN: 250.0,
            description: 'Compra de tour a Teotihuacán',
            reference: 'TOUR-001',
          },
        }),
        this.prisma.wallet_transactions.create({
          data: {
            walletId: wallet.id,
            type: 'TRANSFER_RECEIVED',
            amountMXN: 100.0,
            description: 'Transferencia de amigo',
            reference: 'TRANSFER-001',
          },
        }),
      ]);

      return {
        success: true,
        user,
        wallet,
        transactions,
        message: 'Usuario de prueba creado exitosamente'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'Error al crear usuario de prueba'
      };
    }
  }

  @Get('wallet/:userId')
  async getTestWallet(@Param('userId') userId: string) {
    try {
      const wallet = await this.prisma.wallets.findUnique({
        where: { userId },
        include: {
          transactions: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!wallet) {
        return { success: false, message: 'Wallet no encontrado' };
      }

      return { success: true, wallet };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'Error al obtener wallet de prueba'
      };
    }
  }

  @Post('add-funds/:userId')
  async addTestFunds(@Param('userId') userId: string, @Body() { amount, currency }: { amount: number; currency: 'MXN' | 'AXO' }) {
    try {
      const wallet = await this.prisma.wallets.findUnique({
        where: { userId },
      });

      if (!wallet) {
        return { success: false, message: 'Wallet no encontrado' };
      }

      const updateData = currency === 'MXN' 
        ? { balanceMXN: { increment: amount } }
        : { balanceAxo: { increment: amount } };

      const updatedWallet = await this.prisma.wallets.update({
        where: { userId },
        data: updateData,
      });

      // Crear transacción
      await this.prisma.wallet_transactions.create({
        data: {
          walletId: wallet.id,
          type: 'DEPOSIT',
          ...(currency === 'MXN' ? { amountMXN: amount } : { amountAxo: amount }),
          description: `Depósito de prueba de ${amount} ${currency}`,
          reference: `TEST-${Date.now()}`,
        },
      });

      return {
        success: true,
        wallet: updatedWallet,
        message: `${amount} ${currency} agregados exitosamente`
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        message: 'Error al agregar fondos de prueba'
      };
    }
  }
}
