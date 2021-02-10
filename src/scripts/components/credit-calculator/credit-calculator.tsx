import React, { Component } from 'react'
import { CreditCalculationParams, CreditCalculationResult, CreditCalculationType, PeriodType } from '../../servcies/credit-calculator-data-models';
import CreditCalculatorForm from './credit-calculator-form'
import CreditCalculatorResult from './credit-calculator-result'


interface State {
    result: CreditCalculationResult | null;
}

export default class CreditCalculator extends Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = { result: null };
    }

    handleCalculation = (params: CreditCalculationParams) => {

    }

    render() {
        return (
            <div className="credit-calculator">
                <CreditCalculatorForm onCalculate={this.handleCalculation}/>
                <CreditCalculatorResult result={this.state.result}/>
            </div>
        )
    }
}
