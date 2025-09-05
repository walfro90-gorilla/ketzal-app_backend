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
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          email: 'test@ketzal.com',
          name: 'Usuario de Prueba',
          password: 'hashedpassword123',
          role: 'user',
          referralCode: 'TEST123',
          axoCoinsEarned: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Crear wallet para el usuario
      const wallet = await this.prisma.wallet.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          userId: user.id,
          balanceMXN: 1000.0,
          balanceAxo: 500.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Crear algunas transacciones de ejemplo
      const transactions = await Promise.all([
        this.prisma.walletTransaction.create({
          data: {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            walletId: wallet.id,
            type: 'DEPOSIT',
            amountMXN: 1000.0,
            description: 'Depósito inicial de bienvenida',
            reference: 'WELCOME-001',
            createdAt: new Date(),
          },
        }),
        this.prisma.walletTransaction.create({
          data: {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            walletId: wallet.id,
            type: 'REWARD',
            amountAxo: 500.0,
            description: 'Regalo de bienvenida AXO Coins',
            reference: 'WELCOME-AXO-001',
            createdAt: new Date(),
          },
        }),
        this.prisma.walletTransaction.create({
          data: {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            walletId: wallet.id,
            type: 'PURCHASE',
            amountMXN: -200.0,
            amountAxo: -100.0,
            description: 'Compra de servicio turístico',
            reference: 'SERVICE-001',
            createdAt: new Date(),
          },
        }),
        this.prisma.walletTransaction.create({
          data: {
            id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            walletId: wallet.id,
            type: 'REFUND',
            amountMXN: 50.0,
            description: 'Reembolso por cancelación',
            reference: 'REFUND-001',
            createdAt: new Date(),
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
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId },
        include: {
          WalletTransaction: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
          Users: {
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
      const wallet = await this.prisma.wallet.findUnique({
        where: { userId },
      });

      if (!wallet) {
        return { success: false, message: 'Wallet no encontrado' };
      }

      const updateData = currency === 'MXN' 
        ? { balanceMXN: { increment: amount } }
        : { balanceAxo: { increment: amount } };

      const updatedWallet = await this.prisma.wallet.update({
        where: { userId },
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
      });

      // Crear transacción
      await this.prisma.walletTransaction.create({
        data: {
          id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          walletId: wallet.id,
          type: 'DEPOSIT',
          createdAt: new Date(),
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
