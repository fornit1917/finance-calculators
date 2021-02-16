import React, { PureComponent } from "react";
import { Fields, getCreditCalculationParams, validateCreditForm } from "../../servcies/credit-calculator-form-service";
import {
    CreditCalculationParams,
    CreditCalculationType,
    PaymentType,
    PeriodType,
} from "../../servcies/credit-calculator-types";
import { formatMoney, getNumberChars, getPositiveIntegerChars } from "../../utils/number-formatters";
import DropdownField from "../common/dropdown-field";
import InputField from "../common/input-field";
import RadoibuttonsField from "../common/radiobuttons-field";

interface CreditCalculatorFormProps {
    onCalculate: (params: CreditCalculationParams) => void;
}

export interface CreditCalculatorFormState {
    values: { [key in Fields]: string };
    errors: { [key in Fields]?: string };
}

const CALC_TYPE_OPTIONS = [
    { value: CreditCalculationType.Payment.toString(), text: "Расчёт ежемесячного платежа" },
    { value: CreditCalculationType.Period.toString(), text: "Расчёт срока кредита" },
    { value: CreditCalculationType.MaxAmount.toString(), text: "Расчёт максимальной суммы" },
];

const PAYMENT_TYPE_OPTIONS = [
    { value: PaymentType.Annuity.toString(), text: "Аннуитетный" },
    { value: PaymentType.Differentiated.toString(), text: "Дифференцированный" },
];

const PERIOD_TYPE_OPTIONS = [
    { value: PeriodType.Year.toString(), text: "Лет" },
    { value: PeriodType.Month.toString(), text: "Месяцев" },
];

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
                paymentType: PaymentType.Annuity.toString(),
            },
            errors: {},
        };
    }

    handleCalculationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = { ...this.state.values, calculationType: e.currentTarget.value };
        this.setState({ ...this.state, values });
    };

    handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const values = { ...this.state.values, paymentType: e.currentTarget.dataset.value };
        this.setState({ ...this.state, values });
    };

    handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.currentTarget.id;
        let formatter: (s: string) => string;
        if (id === Fields.Amount || id === Fields.Payment) {
            formatter = formatMoney;
        } else if (id === Fields.Period) {
            formatter = getPositiveIntegerChars;
        } else {
            formatter = getNumberChars;
        }
        
        const value = formatter(e.currentTarget.value);
        console.log({value, src: e.currentTarget.value});
        if (value === null) {
            return;
        }

        const values = { ...this.state.values, [id]: value };
        
        if (this.state.errors[id]) {
            const fieldError = validateCreditForm(values, id as Fields)[id];
            const errors = { ...this.state.errors };
            if (!fieldError) {
                delete errors[id];
            } else {
                errors[id] = fieldError;
            }
            this.setState({ ...this.state, values, errors });
        } else {
            this.setState({ ...this.state, values });
        }
    };

    handlePeriodTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = { ...this.state.values, periodType: e.currentTarget.value };
        this.setState({ ...this.state, values });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const values = this.state.values;
        const errors = validateCreditForm(values);
        this.setState({ ...this.state, errors }, () => {
            if (Object.keys(errors).length === 0) {
                const calculationParams = getCreditCalculationParams(this.state.values);
                this.props.onCalculate(calculationParams);
            }
        });
    }

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
                error={this.state.errors.payment}
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
                additionalText="Руб."
                value={this.getValue(Fields.Amount)}
                onChange={this.handleTextInputChange}
                error={this.state.errors.amount}
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
                error={this.state.errors.period}
                renderAdditionalControl={this.renderPeriodTypeDropdown}
            />
        );
    }

    private renderPaymentTypeField() {
        if (this.getValueAsNumber(Fields.CalculationType) !== CreditCalculationType.Payment) {
            return null;
        }
        return (
            <RadoibuttonsField
                id={Fields.PaymentType}
                label="Вид платежа"
                value={this.getValue(Fields.PaymentType)}
                options={PAYMENT_TYPE_OPTIONS}
                onChange={this.handlePaymentTypeChange}
            />
        );
    }

    renderPeriodTypeDropdown = () => {
        return (
            <select className="form-select" onChange={this.handlePeriodTypeChange}>
                {PERIOD_TYPE_OPTIONS.map(x => <option key={x.value} value={x.value}>{x.text}</option>)}
            </select>            
        )
    }

    render() {
        const errors = this.state.errors;
        return (
            <div className="content-container content-container--small">
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                        additionalText="% годовых"
                        value={this.getValue(Fields.Percent)}
                        onChange={this.handleTextInputChange}
                        error={errors.percent}
                    />
                    {this.renderPaymentTypeField()}
                    <button type="submit" className="btn btn-primary">Рассчитать</button>
                </form>
            </div>
        );
    }
}
