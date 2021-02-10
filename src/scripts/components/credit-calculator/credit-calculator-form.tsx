import React, { PureComponent } from 'react'
import { CreditCalculationParams, CreditCalculationType, PeriodType } from '../../servcies/credit-calculator-data-models'

interface CreditCalculatorFormProps
{
    onCalculate: (params: CreditCalculationParams) => void;
}

export interface CreditCalculatorFormState {
    calculationType: CreditCalculationType,
    amount: string,
    period: string,
    periodType: PeriodType,
    percent: string,
}

export default class CreditCalculatorForm extends PureComponent<CreditCalculatorFormProps, CreditCalculatorFormState> {
    constructor(props) {
        super(props);
        this.state = {
            calculationType: CreditCalculationType.Payment,
            amount: "",
            percent: "",
            period: "",
            periodType: PeriodType.Year,
        }
    }

    handleCalculationTypeChange = () => {

    }

    handleAmountChange = () => {

    }
    
    handlePercentChange = () => {

    }
    
    handlePeriodChange = () => {

    }
    
    handlePeriodTypeChange = () => {

    }    

    render() {
        return (
            <div>
                Credit calculator form will be here
            </div>
        )
    }
}
