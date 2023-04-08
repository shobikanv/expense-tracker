import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, InputGroup } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.min.css";


function EIForm() {
  const [formData, setFormData] = useState({
    date: "",
    account: "",
    transaction_type: "",
    amount: "",
    flag: false,
    tags: [],
    note: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8002/api/accounts/").then((response) => {
      setAccounts(response.data);
    });
    axios.get("http://127.0.0.1:8002/api/transactions/").then((response) => {
      setTransactionTypes(response.data);
      console.log("############",response.data)
    });
    axios.get("http://127.0.0.1:8002/api/tags/").then((response) => {
      setTagOptions(
        response.data.map((tag) => ({ value: tag.name, label: tag.name }))
      );
    });
  }, []);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (newValue) => {
    setSelectedTags(newValue);
    setFormData({
      ...formData,
      tags: newValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      account: formData.account,
      transaction_type: formData.transaction_type,
      amount: formData.amount,
      date: formData.date,
      flag: formData.flag,
      tags: formData.tags.map((tag) => tag.value),
      note: formData.note,
    };
    axios.post("http://127.0.0.1:8002/api/transactions/", data).then(() => {
      alert("Transaction added successfully!");
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="account">
          <Form.Label>Account:</Form.Label>
          <Form.Control
            as="select"
            name="account"
            onChange={handleInputChange}
            value={formData.account}
            required
          >
            <option value="">Select an account</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} - {account.group}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="transaction_type">
          <Form.Label>Transaction Type:</Form.Label>
          <Form.Control
            as="select"
            name="transaction_type"
            onChange={handleInputChange}
            value={formData.transaction_type}
            required
          >
            <option value="">Select a transaction type</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
            <option value="TRANSFER">Transfer</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags:</Form.Label>
          <CreatableSelect
            isMulti
            onChange={handleTagChange}
            options={tagOptions}
            value={selectedTags}
          />
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Label>Note:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleInputChange}
            value={formData.note}
          />
        </Form.Group>
        <Form.Group controlId="flag">
          <Form.Check
            type="checkbox"
            name="flag"
            label="Flag this transaction"
            onChange={handleInputChange}
            checked={formData.flag}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Transaction
        </Button>{" "}
      </Form>
    </>
  );
}

export default EIForm;
