import React, { ReactElement } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    CreditCalculationResult,
    CreditCalculationType,
    MonthlyDataItem,
    PaymentType,
} from "../../servcies/credit-calculator-types";
import { getMonthAndYear } from "../../utils/date-formatters";
import { formatMoneyPadded, roundMoney } from "../../utils/number-formatters";

export default function CreditCalculatorResult(props: { result: CreditCalculationResult | null }) {
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

    const { charges, monthlyPayment, total, amount, period, monthlyData } = props.result.values!;

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

    const pieData = {
        labels: ["Сумма кредита", "Сумма переплаты"],
        datasets: [
            {
                data: [amount, charges],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
            },
        ],
    };

    const monthlyBarData = getMonthlyBarData(monthlyData);

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-6">{rows}</div>
                <div className="col-md-6">
                    <Pie data={pieData} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <Bar
                        data={monthlyBarData}
                        options={{
                            title: {
                                display: true,
                                text: "График погашений",
                            },
                            tooltips: {
                                mode: "index",
                                intersect: false,
                            },
                            responsive: true,
                            scales: {
                                xAxes: [
                                    {
                                        stacked: true,
                                    },
                                ],
                                yAxes: [
                                    {
                                        stacked: true,
                                    },
                                ],
                            },
                        }}
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <table className="table table-bordered monthly-result-table">
                        <thead>
                            <tr>
                                <th>Месяц</th>
                                <th>Сумма платежа</th>
                                <th>Платёж по основном долгу</th>
                                <th>Платёж по процентам</th>
                                <th>Остаток</th>
                            </tr>
                        </thead>
                        <tbody>{renderMonthlyDataRows(props.result, monthlyBarData.labels)}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function renderRowInResult(label: string, value: number | [number, number], postLabel: string = "руб.") {
    const valueStr =
        typeof value === "number"
            ? formatMoneyPadded(value.toString())
            : `${formatMoneyPadded(value[0].toString())} .. ${formatMoneyPadded(value[1].toString())}`;
    return (
        <div className="row mb-3 calc-result-row" key={label}>
            <div className="col-sm-6">{label}</div>
            <div className="col-sm-6">
                <span className="calc-result-row__value">{valueStr} </span>
                <span className="calc-result-row__currency">{postLabel}</span>
            </div>
        </div>
    );
}

function getMonthlyBarData(monthlyData: MonthlyDataItem[]) {
    const n = monthlyData.length;
    const currentDate = new Date();
    const labels: string[] = new Array(n);
    for (let i = 0; i < n; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() + i);
        labels[i] = getMonthAndYear(date);
    }

    return {
        labels,
        datasets: [
            {
                label: "Основной долг",
                backgroundColor: "#FF6384",
                hoverBackgroundColor: "#FF6384",
                data: monthlyData.map((x) => x.main),
            },
            {
                label: "Проценты",
                backgroundColor: "#36A2EB",
                hoverBackgroundColor: "#36A2EB",
                data: monthlyData.map((x) => x.percent),
            },
        ],
    };
}

function renderMonthlyDataRows(result: CreditCalculationResult, monthNames: string[]) {
    const { monthlyData } = result.values;
    const n = monthlyData.length;
    const rows = new Array(n + 1);
    for (let i = 0; i < n; i++) {
        const item = monthlyData[i];
        const payment =
            result.paymentType === PaymentType.Annuity
                ? result.values.monthlyPayment
                : roundMoney(item.main + item.percent);

        rows[i] = (
            <tr key={monthNames[i]}>
                <td>{monthNames[i]}</td>
                <td>{formatMoneyPadded(payment.toString())}</td>
                <td>{formatMoneyPadded(item.main.toString())}</td>
                <td>{formatMoneyPadded(item.percent.toString())}</td>
                <td>{formatMoneyPadded(item.left.toString())}</td>
            </tr>
        );
    }
    rows[n] = (
        <tr key="total">
            <td></td>
            {renderSummaryResultsTableCell(result.values.total, "(Выплачено всего)")}
            {renderSummaryResultsTableCell(result.values.amount, "(Выплаченный долг)")}
            {renderSummaryResultsTableCell(result.values.charges, "(Выплаченные проценты)")}
            <td></td>
        </tr>
    );
    return rows;
}

function renderSummaryResultsTableCell(value: number, comment: string) {
    return (
        <td>
            <b>{formatMoneyPadded(value.toString())}</b>&nbsp;<span className="small-text">Руб.</span>
            <br/>
            <span className="small-text">{comment}</span>
        </td>
    )
}