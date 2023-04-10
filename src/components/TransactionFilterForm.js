import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";

export default function TransactionFilterForm({ onSubmit }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [transactionType, setTransactionType] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8002/api/tags/").then((response) => {
      setTags(
        response.data.map((tag) => ({ value: tag.name, label: tag.name }))
      );
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      from_date: fromDate,
      to_date: toDate,
      tags: selectedTags.map((tag) => tag.value).join(","), // save only tag names
      transaction_type: transactionType,
    });
  };

  const handleTagsChange = (selected) => {
    setSelectedTags(selected);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="fromDate">
        <Form.Label>From date</Form.Label>
        <Form.Control
          type="date"
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="toDate">
        <Form.Label>To date</Form.Label>
        <Form.Control
          type="date"
          value={toDate}
          onChange={(event) => setToDate(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="tags">
        <Form.Label>Tags</Form.Label>
        <Select
          isMulti
          options={tags}
          value={selectedTags}
          onChange={handleTagsChange}
        />
      </Form.Group>

      <Form.Group controlId="transactionType">
        <Form.Label>Transaction type</Form.Label>
        <Form.Control
          as="select"
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
        >
          <option value="">All</option>
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Apply filters
      </Button>
    </Form>
  );
}
