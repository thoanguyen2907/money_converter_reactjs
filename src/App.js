import React, { useEffect, useState } from 'react';
import './App.css'; 
import CurrencyRow from './CurrencyRow';
const BASE_URL = "https://api.exchangeratesapi.io/latest"; 



const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]); 
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();

  useEffect(() => {
     fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]; 
      setCurrencyOptions([data["base"], ...Object.keys(data.rates)])
      setFromCurrency(data["base"])
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
   
  }, []);

  let toAmount, fromAmount;
  if(amountFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate; 
  } else {
    toAmount = amount;
    fromAmount = amount/exchangeRate
  }

const handleChangeAmountFromCurrency = (e) => {
  setAmount(e.target.value)
  setAmountFromCurrency(true)
}
const handleChangeAmountToCurrency = (e) => {
  setAmount(e.target.value)
  setAmountFromCurrency(false)
}
useEffect(()=>{
  if(fromCurrency != null && toCurrency != null){
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then((res) =>   res.json())
    .then(data => setExchangeRate(data["rates"][toCurrency]))
    .catch((error)=>{
      console.log(error);
    })
  }
}, [fromCurrency, toCurrency])
  return (
    <div>
      <h1>Converter Money</h1>
      <CurrencyRow
       currencyOptions = {currencyOptions}
       selectedValue = {fromCurrency}
       handleSelect = {(e) => {
         setFromCurrency(e.target.value)
       }}
       handleChangeAmount = {handleChangeAmountFromCurrency}
       amount = {fromAmount}
      ></CurrencyRow>
      <div className="equals"> = </div>
      <CurrencyRow
       currencyOptions = {currencyOptions}
       selectedValue = {toCurrency}
       handleSelect = {(e) => {
        setToCurrency(e.target.value)
       }}
       handleChangeAmount = {handleChangeAmountToCurrency}
       amount = {toAmount}
      ></CurrencyRow>
    </div>
  );
}

export default App;
