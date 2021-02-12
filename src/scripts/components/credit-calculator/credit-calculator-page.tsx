import React from 'react'
import CreditCalculator from './credit-calculator'

export default function CreditCalculatorPage() {
    return (
        <div className="calc-page">
            <h2 className="calc-header">Кредитный калькулятор</h2>
            <div className="calc-content">
                <CreditCalculator/>    
            </div>
        </div>
    )
}
