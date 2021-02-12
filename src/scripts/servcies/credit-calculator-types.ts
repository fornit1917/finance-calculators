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

export interface CreditCalculationResult {
    readonly error?: string;
}

