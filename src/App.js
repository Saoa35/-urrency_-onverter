import React, { useEffect, useState } from "react";
import { Block } from "./Block";
import './index.scss';

const url = 'https://cdn.cur.su/api/latest.json';

function App() {

  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => {
        setRates(json.rates);
        // console.log(json.rates);
      })
      .catch(err => {console.log(err.mesage)});
  });

  const onChangeFromPrice = (value) => {
    setFromPrice(value);
  }

  const onChangeToPrice = (value) => {
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block value={0} currency={fromCurrency} onChangeCurrency={(cur) => setFromCurrency(cur)} />
      <Block value={0} currency={toCurrency} onChangeCurrency={(cur) => setToCurrency(cur)} />
    </div>
  );
}

export default App;
