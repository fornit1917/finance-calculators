import React from "react";
import { CreditCalculationResult } from "../../servcies/credit-calculator-types";

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

    return <p>Здесь будет результат расчёта</p>;
}
