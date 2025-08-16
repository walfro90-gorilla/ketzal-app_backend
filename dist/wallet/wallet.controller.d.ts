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
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallet(userId: string): Promise<{
        success: boolean;
        wallet: {
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
    }>;
    addFunds(userId: string, addFundsDto: AddFundsDto): Promise<{
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
    }>;
    transferFunds(userId: string, transferDto: TransferFundsDto): Promise<{
        success: boolean;
        wallet: any;
        message: string;
    }>;
    getTransactions(userId: string, limit?: string, offset?: string): Promise<{
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
        success: boolean;
    }>;
    convertCurrency(userId: string, convertDto: ConvertCurrencyDto): Promise<{
        message: string;
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
        success: boolean;
    }>;
}
