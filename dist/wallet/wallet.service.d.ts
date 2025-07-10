import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateWallet(userId: string): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            walletId: string;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            amountMXN: number | null;
            amountAxo: number | null;
            description: string;
            reference: string | null;
        }[];
    } & {
        id: string;
        userId: string;
        balanceMXN: number;
        balanceAxo: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addFunds(userId: string, amountMXN: number, amountAxo: number, description?: string, paymentMethod?: string): Promise<{
        id: string;
        userId: string;
        balanceMXN: number;
        balanceAxo: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    transferFunds(userId: string, recipientEmail: string, amountMXN: number, amountAxo: number, description?: string): Promise<{
        id: string;
        userId: string;
        balanceMXN: number;
        balanceAxo: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getTransactions(userId: string, limit: number, offset: number): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            walletId: string;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            amountMXN: number | null;
            amountAxo: number | null;
            description: string;
            reference: string | null;
        }[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }>;
    convertCurrency(userId: string, fromCurrency: 'MXN' | 'AXO', toCurrency: 'MXN' | 'AXO', amount: number): Promise<{
        wallet: {
            id: string;
            userId: string;
            balanceMXN: number;
            balanceAxo: number;
            createdAt: Date;
            updatedAt: Date;
        };
        conversion: {
            from: {
                currency: "MXN" | "AXO";
                amount: number;
            };
            to: {
                currency: "MXN" | "AXO";
                amount: number;
            };
            rate: number;
        };
    }>;
}
