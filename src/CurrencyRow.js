import React from 'react'

export default function CurrencyRow({currencyOptions, selectedValue, amount, handleSelect, handleChangeAmount}) {
    return (
        <div>
           <input type="number" name="exchangeCurr" id="exchangeCurr" onChange = {handleChangeAmount} value = {amount}/>
           <select name="convert" value = {selectedValue} onChange={handleSelect}>
           { currencyOptions.map((item, index) => {
            return <option key = {index} value = {item} > {item}</option>
           })}
           </select>
        </div>
    )
}
