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
    calculationType: CreditCalculationType;
    amount: number;
    period: number;
    periodType: PeriodType;
    percent: number;
    payment: number;
    paymentType: PaymentType;
}

export interface CreditCalculationResult {

}

