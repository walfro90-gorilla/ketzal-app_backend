import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateWallet(userId: string): Promise<{
        transactions: {
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
            reference: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balanceMXN: number;
        balanceAxo: number;
    }>;
    addFunds(userId: string, amountMXN: number, amountAxo: number, description?: string, paymentMethod?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balanceMXN: number;
        balanceAxo: number;
    }>;
    transferFunds(userId: string, recipientEmail: string, amountMXN: number, amountAxo: number, description?: string): Promise<any>;
    getTransactions(userId: string, limit: number, offset: number): Promise<{
        transactions: {
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balanceMXN: number;
            balanceAxo: number;
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
