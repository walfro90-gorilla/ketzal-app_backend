import { PrismaService } from '../prisma/prisma.service';
export declare class TestController {
    private prisma;
    constructor(prisma: PrismaService);
    createTestUser(): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string | null;
            image: string | null;
            createdAt: Date;
            updatedAt: Date;
            supplierId: number | null;
            email: string;
            password: string | null;
            emailVerified: Date | null;
            role: import(".prisma/client").$Enums.Role;
            axoCoinsEarned: number | null;
            referralCode: string | null;
        };
        wallet: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balanceMXN: number;
            balanceAxo: number;
        };
        transactions: [{
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
            reference: string | null;
        }, {
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
            reference: string | null;
        }, {
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
            reference: string | null;
        }, {
            id: string;
            description: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.WalletTransactionType;
            walletId: string;
            amountMXN: number | null;
            amountAxo: number | null;
            reference: string | null;
        }];
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message: string;
        user?: undefined;
        wallet?: undefined;
        transactions?: undefined;
    }>;
    getTestWallet(userId: string): Promise<{
        success: boolean;
        message: string;
        wallet?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        wallet: {
            user: {
                id: string;
                name: string | null;
                email: string;
            };
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
        };
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message: string;
        wallet?: undefined;
    }>;
    addTestFunds(userId: string, { amount, currency }: {
        amount: number;
        currency: 'MXN' | 'AXO';
    }): Promise<{
        success: boolean;
        message: string;
        wallet?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        wallet: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balanceMXN: number;
            balanceAxo: number;
        };
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message: string;
        wallet?: undefined;
    }>;
}
