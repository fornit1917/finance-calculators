import { CreditCalculationParams, CreditCalculationResult, CreditCalculationType, PaymentType, PeriodType } from "./credit-calculator-types";

export function calculateCredit(params: CreditCalculationParams): CreditCalculationResult {
    if (params.paymentType == PaymentType.Annuity) {
        return calculateAnnuity(params);
    } else {
        return { error: "Выбранный метод платежа временно не поддерживается", calculationType: params.calculationType };
    }
}

function calculateAnnuity(params: CreditCalculationParams): CreditCalculationResult {
    const i = params.percent / 12 / 100;
    
    if (params.calculationType === CreditCalculationType.MaxAmount || params.calculationType === CreditCalculationType.Payment) {
        const n = params.periodType === PeriodType.Month ? params.period : params.period * 12;
        const k1 = Math.pow(1 + i, n);
        const k = i * k1 / (k1 - 1);

        let monthlyPayment: number, total: number, charges: number, amount: number;
        if (params.calculationType === CreditCalculationType.Payment) {
            // payment
            monthlyPayment = k * params.amount;
            total = monthlyPayment * n;
            charges = total - params.amount;
            amount = params.amount;
        } else {
            // max amount
            monthlyPayment = params.payment;
            amount = params.payment / k;
            total = params.payment * n;
            charges = total - amount;
        }

        return {
            values: {
                monthlyPayment: roundMoney(monthlyPayment),
                total: roundMoney(total),
                charges: roundMoney(charges),
                amount: roundMoney(amount),
                period: params.period,
            },
            calculationType: params.calculationType
        }        
    } else {

        if (params.payment < i * params.amount) {
            return { error: "Суммы ежемесячного платежа недостаточно для покрытия процентов за первый месяц.", calculationType: CreditCalculationType.Period };
        }

        let left = params.amount;
        let n = 0;
        let totalCharges = 0;
        while (left > 0) {
            const charges = left * i;
            left = left - params.payment + charges;
            n++;
            totalCharges += charges;
        }

        return {
            values: {
                monthlyPayment: roundMoney(params.payment),
                total: roundMoney(params.amount + totalCharges),
                charges: roundMoney(totalCharges),
                amount: roundMoney(params.amount),
                period: n,
            },
            calculationType: params.calculationType
        }               
    }   
}

function roundMoney(x: number): number {
    return parseFloat(x.toFixed(2));
}