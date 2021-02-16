import React, { Component } from 'react'
import { calculateCredit } from '../../servcies/credit-calculation';
import { CreditCalculationParams, CreditCalculationResult, CreditCalculationType, PeriodType } from '../../servcies/credit-calculator-types';
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
        const result = calculateCredit(params);
        this.setState({ ...this.state, result });
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
