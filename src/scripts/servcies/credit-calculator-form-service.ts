import { stringToNumber } from "../utils/number-formatters";
import {
    createConditionalValidator,
    createLessThanValidator,
    createMoreThanValidator,
    isRequired,
    validate,
    ValidationRules,
} from "../utils/validators";
import { CreditCalculationParams, CreditCalculationType, PeriodType } from "./credit-calculator-types";

export enum Fields {
    CalculationType = "calculationType",
    Amount = "amount",
    Period = "period",
    PeriodType = "periodType",
    Percent = "percent",
    Payment = "payment",
    PaymentType = "paymentType",
}

const MIN_AMOUNT = 1;
const MIN_PAYMENT = 1;
const MIN_PERIOD = 1;
const MAX_PERIOD_MONTH = 600;
const MAX_PERIOD_YEAR = 50;

const validationRules: ValidationRules = {
    [Fields.Amount]: createConditionalValidator(
        (formValues) => Number(formValues[Fields.CalculationType]) !== CreditCalculationType.MaxAmount,
        isRequired,
        createMoreThanValidator(MIN_AMOUNT, stringToNumber),
    ),

    [Fields.Payment]: createConditionalValidator(
        formValues => Number(formValues[Fields.CalculationType]) !== CreditCalculationType.Payment,
        isRequired,
        createMoreThanValidator(MIN_PAYMENT, stringToNumber),
    ),

    [Fields.Period]: createConditionalValidator(
        formValues => Number(formValues[Fields.CalculationType]) !== CreditCalculationType.Period,
        isRequired,
        createConditionalValidator(
            formValues => Number(formValues[Fields.PeriodType]) === PeriodType.Month,
            createLessThanValidator(MAX_PERIOD_MONTH, stringToNumber)
        ),
        createConditionalValidator(
            formValues => Number(formValues[Fields.PeriodType]) === PeriodType.Year,
            createLessThanValidator(MAX_PERIOD_YEAR, stringToNumber)
        ),        
        createMoreThanValidator(MIN_PERIOD, stringToNumber),
    ),

    [Fields.Percent]: createConditionalValidator(
        formValues => true,
        isRequired,
        createLessThanValidator(100, stringToNumber),
        createMoreThanValidator(0.001, stringToNumber),
    )
};

export function getCreditCalculationParams(formValues: { [key in Fields]: string }): CreditCalculationParams {
    return {
        calculationType: Number(formValues.calculationType),
        amount: stringToNumber(formValues.amount),
        percent: stringToNumber(formValues.percent),
        period: stringToNumber(formValues.period),
        periodType: Number(formValues.periodType),
        payment: stringToNumber(formValues.payment),
        paymentType: Number(formValues.paymentType),
    };
}

export function validateCreditForm(formValues: { [key in Fields]: string }, fieldForValidation: Fields | null = null) {
    return validate(formValues, validationRules) as {[key in Fields] : string};
}
