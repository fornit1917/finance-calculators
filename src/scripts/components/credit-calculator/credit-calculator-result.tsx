import React, { ReactElement } from "react";
import { Pie } from "react-chartjs-2";
import { CreditCalculationResult, CreditCalculationType } from "../../servcies/credit-calculator-types";
import { formatMoney } from "../../utils/number-formatters";

export default function CreditCalculatorResult(props: { result: CreditCalculationResult | null }) {
    console.log(props);

    if (props.result === null) {
        return null;
    }

    return (
        <div className="calc-result">
            <div className="content-container">{renderResultContent(props)}</div>
        </div>
    );
}

function renderResultContent(props: { result: CreditCalculationResult }) {
    if (props.result.error) {
        return <p>{props.result.error}</p>;
    }

    const { charges, monthlyPayment, total, amount, period } = props.result.values!;

    let rows: Array<ReactElement>;
    switch (props.result.calculationType) {
        case CreditCalculationType.Payment:
            rows = [
                renderRowInResult("Ежемесячный платёж", monthlyPayment),
                renderRowInResult("Начисленные проценты", charges),
                renderRowInResult("Долг + проценты", total),
            ];
            break;
        case CreditCalculationType.Period:
            rows = [
                renderRowInResult("Срок кредита", period, "месяцев"),
                renderRowInResult("Начисленные проценты", charges),
                renderRowInResult("Долг + проценты", total),
            ];
            break;
        case CreditCalculationType.MaxAmount:
            rows = [
                renderRowInResult("Сумма кредита", amount),
                renderRowInResult("Начисленные проценты", charges),
                renderRowInResult("Долг + проценты", total),
            ];
            break;
        default:
            rows = [];
    }

    console.log({ charges, monthlyPayment, total, amount, period });

    const pieData = {
        labels: [
            "Сумма кредита",
            "Сумма переплаты",
        ],
        datasets: [{
            data: [amount, charges],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            ]
        }]
    };

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-6">
                    {rows}
                </div>
                <div className="col-md-6">
                    <Pie data={pieData}/>
                </div>
            </div>
        </div>
    );
}

function renderRowInResult(label: string, value: number, postLabel: string = "руб.") {
    return (
        <div className="row mb-3 calc-result-row" key={label}>
            <div className="col-sm-6">{label}</div>
            <div className="col-sm-6">
                <span className="calc-result-row__value">{formatMoney(value.toString())} </span>
                <span className="calc-result-row__currency">{postLabel}</span>
            </div>
        </div>
    )
}