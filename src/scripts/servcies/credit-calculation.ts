import { calculateAnnuity } from "./credit-calculation-annuity";
import { calculateDifferentiated } from "./credit-calculation-differentiated";
import {
    CreditCalculationParams,
    CreditCalculationResult,
    PaymentType,
} from "./credit-calculator-types";

export function calculateCredit(params: CreditCalculationParams): CreditCalculationResult {
    if (params.paymentType == PaymentType.Annuity) {
        return calculateAnnuity(params);
    } else {
        return calculateDifferentiated(params);
    }
}
