import { useState, useMemo } from "react";
const currencies = [
  { name: "USD", value: 1 },
  { name: "EUR", value: 0.86 },
  { name: "GBP", value: 0.73 },
  { name: "JPY", value: 144.89 },
  { name: "CFA", value: 565.28 },
];
export function CurrencyConverter() {
  const [startCurrencyValue, setStartCurrencyValue] = useState(1);
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(0.86);
  const [startName, setStartName] = useState("USD");
  const [targetName, setTargetName] = useState("EUR");
  const [amount, setAmount] = useState(1);

  const conversionResult = () =>
    (amount * (targetCurrencyValue / startCurrencyValue)).toFixed(4);

  const handleChangeStart = (e) => {
    const selectedValue = parseFloat(e.target.value);
    const selectedCurrency = currencies.find(
      (curr) => curr.value === selectedValue
    );
    setStartCurrencyValue(selectedValue);
    setStartName(selectedCurrency.name);
  };
  const handleAmount = (e) => {
    setAmount(parseFloat(e.target.value));
  };
  const handleChangeTarget = (e) => {
    const selectedValue = parseFloat(e.target.value);
    const selectedCurrency = currencies.find(
      (curr) => curr.value === selectedValue
    );
    setTargetCurrencyValue(selectedValue);
    setTargetName(selectedCurrency.name);
  };

  const options = currencies.map((curr, idx) => {
    return (
      <option key={`curr-${idx}`} value={curr.value}>
        {curr.name}
      </option>
    );
  });

  return (
    <div className="container">
      <label htmlFor="amount">
        {startName} to {targetName} Conversion
      </label>
      <input id="amount" type="number" value={amount} onChange={handleAmount} />

      <label htmlFor="start">Start Currency</label>
      <select
        id="start"
        value={startCurrencyValue}
        onChange={handleChangeStart}
      >
        {options}
      </select>
      <label htmlFor="target">Target Currency</label>
      <select
        id="target"
        value={targetCurrencyValue}
        onChange={handleChangeTarget}
      >
        {options}
      </select>
      <p className="result">
        Converted Amount: {conversionResult()} {targetName}
      </p>
    </div>
  );
}
