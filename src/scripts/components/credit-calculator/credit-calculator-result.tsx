import React from 'react'
import { CreditCalculationResult } from '../../servcies/credit-calculator-data-models';

export default function CreditCalculatorResult(props: { result: CreditCalculationResult | null }) {
    if (props.result === null) {
        return (<div>Empty result</div>);
    }
    return (
        <div>
            Calculation result will be here
        </div>
    )
}
