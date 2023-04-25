import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function FilterTrans({ onFilterChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get("api/accounts").then((response) => {
      setAccounts(response.data);
    });
  }, []);
  useEffect(() => {
    const filterParams = {
      startDate: startDate,
      endDate: endDate,
      transactionType: transactionType,
      selectedTags: selectedTags,
      selectedAccount: selectedAccount,
    };
    onFilterChange(filterParams);
  }, [startDate, endDate, transactionType, selectedTags, selectedAccount]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };
  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };
  const handleFilterClick = () => {
    const filterParams = {
      startDate: startDate,
      endDate: endDate,
      transactionType: transactionType,
      selectedTags: selectedTags,
      selectedAccount: selectedAccount,
    };
    onFilterChange(filterParams);
    console.log(filterParams);
  };
  const handleClearClick = () => {
    setStartDate("");
    setEndDate("");
    setTransactionType("");
    setSelectedTags([]);
    window.location.reload();
  };

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="transactionType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={transactionType}
                onChange={handleTransactionTypeChange}
              >
                <option value="">All</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="selectedAccount">
              <Form.Label>Account</Form.Label>
              <Form.Select
                value={selectedAccount}
                onChange={handleAccountChange}
              >
                <option value="">All</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.name}>
                    {account.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}
