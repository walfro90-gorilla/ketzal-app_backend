import { PrismaService } from '../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateWallet(userId: string): Promise<any>;
    addFunds(userId: string, amountMXN: number, amountAxo: number, description?: string, paymentMethod?: string): Promise<any>;
    transferFunds(userId: string, recipientEmail: string, amountMXN: number, amountAxo: number, description?: string): Promise<any>;
    getTransactions(userId: string, limit: number, offset: number): Promise<{
        transactions: any;
        pagination: {
            total: any;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }>;
    convertCurrency(userId: string, fromCurrency: 'MXN' | 'AXO', toCurrency: 'MXN' | 'AXO', amount: number): Promise<{
        wallet: any;
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
