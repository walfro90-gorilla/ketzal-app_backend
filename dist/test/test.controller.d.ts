import { PrismaService } from '../prisma/prisma.service';
export declare class TestController {
    private prisma;
    constructor(prisma: PrismaService);
    createTestUser(): Promise<{
        success: boolean;
        user: any;
        wallet: any;
        transactions: any;
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
        wallet: any;
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
        wallet: any;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        message: string;
        wallet?: undefined;
    }>;
}
