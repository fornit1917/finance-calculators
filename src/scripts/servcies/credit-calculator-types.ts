export enum CreditCalculationType {
    Payment,
    Period,
    MaxAmount,
}

export enum PeriodType {
    Month, Year,
}

export enum PaymentType {
    Annuity, Differentiated 
}

export interface CreditCalculationParams {
    readonly calculationType: CreditCalculationType;
    readonly amount: number;
    readonly period: number;
    readonly periodType: PeriodType;
    readonly percent: number;
    readonly payment: number;
    readonly paymentType: PaymentType;
}

export interface MonthlyDataItem {
    main: number;
    percent: number;
    left: number;
}

export interface CreditCalculationResult {
    readonly error?: string;
    readonly calculationType: CreditCalculationType;
    readonly paymentType: PaymentType;
    readonly values?: {
        monthlyPayment: number | [number, number];
        charges: number;
        total: number;
        amount: number;
        period: number;
        monthlyData: MonthlyDataItem[];
    }
}

