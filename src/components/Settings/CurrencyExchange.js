import { useState, useEffect, useCallback } from "react";
import { Form, Table, Button } from "react-bootstrap";

const DEFAULT_CURRENCIES = ["USD", "AUD", "CAD", "INR"];

export default function CurrencyExchange() {
  const [baseCurrency, setBaseCurrency] = useState("INR");
  const [additionalCurrencies, setAdditionalCurrencies] =
    useState(DEFAULT_CURRENCIES);
  const [exchangeRates, setExchangeRates] = useState(null);

  const handleButtonClick = useCallback(() => {
    if (baseCurrency && additionalCurrencies.length) {
      const additionalCurrenciesWithoutBase = additionalCurrencies.filter(
        (currency) => currency !== baseCurrency
      );
      const apiEndpoints = additionalCurrenciesWithoutBase.map(
        (currency) =>
          `https://api.apilayer.com/exchangerates_data/convert?from=${baseCurrency}&to=${currency}&amount=1`
      );
      const myHeaders = new Headers();
      myHeaders.append("apikey", "kI4eE1H4lVneqCgGLY4IEr04xdOuyy9e");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      Promise.all(
        apiEndpoints.map((apiEndpoint) => fetch(apiEndpoint, requestOptions))
      )
        .then((responses) =>
          Promise.all(responses.map((response) => response.json()))
        )
        .then((results) => {
          const exchangeRates = {};
          additionalCurrencies.forEach((currency1, index) => {
            exchangeRates[currency1] = {};
            additionalCurrencies.forEach((currency2, innerIndex) => {
              exchangeRates[currency1][currency2] =
                currency1 === currency2 ? "1" : results[innerIndex].result;
            });
          });
          setExchangeRates(exchangeRates);
        })
        .catch((error) => console.log("error", error));
    }
  }, [baseCurrency, additionalCurrencies]);

  useEffect(() => {
    handleButtonClick();
  }, [handleButtonClick]);
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Select Base Currency</Form.Label>
          <Form.Control
            as="select"
            value={baseCurrency}
            onChange={(event) => setBaseCurrency(event.target.value)}
          >
            <option value="">Select</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select Additional Currencies</Form.Label>
          <Form.Control
            as="select"
            multiple
            value={additionalCurrencies}
            onChange={(event) =>
              setAdditionalCurrencies(
                Array.from(
                  event.target.selectedOptions,
                  (option) => option.value
                )
              )
            }
          >
            <option value="USD">USD</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleButtonClick}>
          Get Exchange Rates
        </Button>
      </Form>

      {exchangeRates && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              {additionalCurrencies.map((currency) => (
                <th key={currency}>{currency}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {additionalCurrencies.map((currency1) => (
              <tr key={currency1}>
                <td>{currency1}</td>
                {additionalCurrencies.map((currency2) => (
                  <td key={currency1 + "-" + currency2}>
                    {exchangeRates[currency1][currency2]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
