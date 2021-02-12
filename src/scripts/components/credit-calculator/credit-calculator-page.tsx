import React from 'react'
import CreditCalculator from './credit-calculator'

export default function CreditCalculatorPage() {
    return (
        <div className="calc-page">
            <h1 className="calc-header">Кредитный калькулятор</h1>
            <div className="calc-content">
                <CreditCalculator/>    
            </div>
        </div>
    )
}
