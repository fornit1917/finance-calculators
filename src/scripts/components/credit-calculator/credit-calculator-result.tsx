import React from 'react'
import { CreditCalculationResult } from '../../servcies/credit-calculator-types';

export default function CreditCalculatorResult(props: { result: CreditCalculationResult | null }) {
    if (props.result === null) {
        return (<div></div>);
    }
    return (
        <div>
            
        </div>
    )
}
