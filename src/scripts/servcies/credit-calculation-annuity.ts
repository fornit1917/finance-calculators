import { roundMoney } from "../utils/number-formatters";
import {
    CreditCalculationParams,
    CreditCalculationResult,
    CreditCalculationType,
    MonthlyDataItem,
    PeriodType,
} from "./credit-calculator-types";

export function calculateAnnuity(params: CreditCalculationParams): CreditCalculationResult {
    const i = params.percent / 12 / 100;

    if (
        params.calculationType === CreditCalculationType.MaxAmount ||
        params.calculationType === CreditCalculationType.Payment
    ) {
        const n = params.periodType === PeriodType.Month ? params.period : params.period * 12;
        const k1 = Math.pow(1 + i, n);
        const k = (i * k1) / (k1 - 1);

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

        const { monthlyData } = getMonthlyData(amount, monthlyPayment, i);

        return {
            values: {
                monthlyPayment: roundMoney(monthlyPayment),
                total: roundMoney(total),
                charges: roundMoney(charges),
                amount: roundMoney(amount),
                period: params.period,
                monthlyData,
            },
            calculationType: params.calculationType,
            paymentType: params.paymentType,
        };
    } else {
        if (params.payment < i * params.amount) {
            return {
                error: "Суммы ежемесячного платежа недостаточно для покрытия процентов за первый месяц.",
                calculationType: CreditCalculationType.Period,
                paymentType: params.paymentType,
            };
        }

        const result = getMonthlyData(params.amount, params.payment, i);

        return {
            values: {
                monthlyPayment: roundMoney(params.payment),
                total: roundMoney(params.amount + result.totalCharges),
                charges: roundMoney(result.totalCharges),
                amount: roundMoney(params.amount),
                period: result.period,
                monthlyData: result.monthlyData,
            },
            calculationType: params.calculationType,
            paymentType: params.paymentType,
        };
    }
}

interface MonthlyDataCalculationResult {
    monthlyData: MonthlyDataItem[];
    totalCharges: number;
    period: number;
}
function getMonthlyData(amount: number, monthlyPayment: number, monthlyPercent: number): MonthlyDataCalculationResult {
    let left = amount;
    let period = 0;
    let totalCharges = 0;
    const monthlyData: MonthlyDataItem[] = [];
    while (left > 0.01) {
        const charges = left * monthlyPercent;
        period++;
        totalCharges += charges;
        left = left - monthlyPayment + charges;

        if (left < 0.01) {
            left = 0;
        }

        monthlyData.push({
            percent: roundMoney(charges),
            main: roundMoney(monthlyPayment - charges),
            left: roundMoney(left),
        });
    }
    return { monthlyData, totalCharges, period };
}
