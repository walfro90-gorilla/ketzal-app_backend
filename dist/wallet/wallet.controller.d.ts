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
        wallet: any;
    }>;
    addFunds(userId: string, addFundsDto: AddFundsDto): Promise<{
        success: boolean;
        wallet: any;
        message: string;
    }>;
    transferFunds(userId: string, transferDto: TransferFundsDto): Promise<{
        success: boolean;
        wallet: any;
        message: string;
    }>;
    getTransactions(userId: string, limit?: string, offset?: string): Promise<{
        transactions: any;
        pagination: {
            total: any;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
        success: boolean;
    }>;
    convertCurrency(userId: string, convertDto: ConvertCurrencyDto): Promise<{
        message: string;
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
        success: boolean;
    }>;
}
