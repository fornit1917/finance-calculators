import React, { PureComponent } from "react";
import {
    CreditCalculationParams,
    CreditCalculationType,
    PeriodType,
} from "../../servcies/credit-calculator-data-models";
import DropdownField from "../common/dropdown-field";
import InputField from "../common/input-field";

interface CreditCalculatorFormProps {
    onCalculate: (params: CreditCalculationParams) => void;
}

enum Fields {
    CalculationType = "calculationType",
    Amount = "amount",
    Period = "period",
    PeriodType = "periodType",
    Percent = "percent",
    Payment = "payment",
}

export interface CreditCalculatorFormState {
    values: { [key in Fields]: string };
}

const CALC_TYPE_OPTIONS = [
    { value: CreditCalculationType.Payment.toString(), text: "Расчёт ежемесячного платежа" },
    { value: CreditCalculationType.Period.toString(), text: "Расчёт срока кредита" },
    { value: CreditCalculationType.MaxAmount.toString(), text: "Расчёт максимальной суммы" },
]

export default class CreditCalculatorForm extends PureComponent<CreditCalculatorFormProps, CreditCalculatorFormState> {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                calculationType: CreditCalculationType.Payment.toString(),
                amount: "",
                period: "",
                periodType: PeriodType.Year.toString(),
                percent: "",
                payment: "",
            },
        };
    }

    handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = { ...this.state.values, calculationType: e.currentTarget.value };
        this.setState({ ...this.state, values });
    };

    handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.currentTarget.id;
        if (id in Fields) {
            const value = e.currentTarget.value;
            const values = { ...this.state.values, [id]: value };
            this.setState({ ...this.state, values });
        }
    };

    private getValue(field: Fields): string {
        return this.state.values[field];
    }

    private getValueAsNumber(field: Fields): Number {
        return Number(this.getValue(field));
    }

    private renderPaymentField() {
        if (this.getValueAsNumber(Fields.CalculationType) === CreditCalculationType.Payment) {
            return null;
        }
        return (
            <InputField
                id={Fields.Payment}
                label="Ежемесячный платёж"
                value={this.getValue(Fields.Payment)}
                onChange={this.handleTextInputChange}
            />
        );
    }

    private renderAmountField() {
        if (this.getValueAsNumber(Fields.CalculationType) === CreditCalculationType.MaxAmount) {
            return null;
        }
        return (
            <InputField
                id={Fields.Amount}
                label="Сумма кредита"
                value={this.getValue(Fields.Amount)}
                onChange={this.handleTextInputChange}
            />
        );
    }

    private renderPeriodField() {
        if (this.getValueAsNumber(Fields.CalculationType) === CreditCalculationType.Period) {
            return null;
        }
        return (
            <InputField
                id={Fields.Period}
                label="Срок кредита"
                value={this.getValue(Fields.Period)}
                onChange={this.handleTextInputChange}
            />
        );
    }

    render() {
        return (
            <div>
                <form>
                    <DropdownField
                        id={Fields.CalculationType}
                        label="Вариант расчёта"
                        value={this.getValue(Fields.CalculationType)}
                        options={CALC_TYPE_OPTIONS}
                        onChange={this.handleCalculationTypeChange}
                    />
                    {this.renderAmountField()}
                    {this.renderPeriodField()}
                    {this.renderPaymentField()}
                    <InputField
                        id={Fields.Percent}
                        label="Процентная ставка"
                        value={this.getValue(Fields.Amount)}
                        onChange={this.handleTextInputChange}
                    />
                </form>
            </div>
        );
    }
}
