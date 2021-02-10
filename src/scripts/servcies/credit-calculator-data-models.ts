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
    amount: Number;
    period: Number;
    periodType: PeriodType;
    percent: Number;
}

export interface CreditCalculationResult {

}

