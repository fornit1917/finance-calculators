import { roundMoney } from "../utils/number-formatters";
import {
    CreditCalculationParams,
    CreditCalculationResult,
    MonthlyDataItem,
    PeriodType,
} from "./credit-calculator-types";

export function calculateDifferentiated(params: CreditCalculationParams): CreditCalculationResult {
    const n = params.periodType === PeriodType.Month ? params.period : params.period * 12;
    const fixedPart = params.amount / n;
    let left = params.amount;
    let i = 0;
    let totalCharges = 0;
    let period = 0;
    const monthlyData: MonthlyDataItem[] = [];
    while (left > 0.01) {
        
        const si = params.amount - fixedPart * i;
        const charges = (si * params.percent) / 1200;
        period++;
        totalCharges += charges;
        left = left - fixedPart;

        if (left < 0.01) {
            left = 0;
        }

        monthlyData.push({
            percent: roundMoney(charges),
            main: roundMoney(fixedPart),
            left: roundMoney(left),
        });

        i++;
    }

    return {
        calculationType: params.calculationType,
        paymentType: params.paymentType,
        values: {
            amount: params.amount,
            charges: roundMoney(totalCharges),
            total: roundMoney(params.amount + totalCharges),
            period,
            monthlyData,
            monthlyPayment: [
                roundMoney(monthlyData[period - 1].main + monthlyData[period - 1].percent),
                roundMoney(monthlyData[0].main + monthlyData[0].percent),
            ],
        }
    }
}
