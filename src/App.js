import React, { useEffect, useRef, useState } from "react";
import { Block } from "./Block";
import './index.scss';

const url = 'https://cdn.cur.su/api/latest.json';

function App() {

  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);

  const ratesRef = useRef({})

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setRates(json.rates);
        onChangeToPrice(1);
      })
      .catch(err => {console.log(err.mesage)});
  });

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setFromPrice(value);
    setToPrice(result);
  }

  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setToPrice(value);
    setFromPrice(result);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);



  return (
    <div className="App">

      <Block 
        value={fromPrice} 
        currency={fromCurrency} 
        onChangeCurrency={setFromCurrency} 
        onChangeValue={onChangeFromPrice} />

      <Block 
        value={toPrice} 
        currency={toCurrency} 
        onChangeCurrency={(cur) => setToCurrency(cur)} 
        onChangeValue={onChangeToPrice} />

    </div>
  );
}

export default App;
