import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AccountForm = () => {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      group: group,
      balance: balance,
    };
    axios
      .post("http://127.0.0.1:8002/api/accounts/", data)
      .then((response) => {
        setName("")
        setGroup("")
        setBalance("")
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter account name"
        />
      </Form.Group>

      <Form.Group controlId="group">
        <Form.Label>Group</Form.Label>
        <Form.Control
          as="select"
          value={group}
          onChange={(event) => setGroup(event.target.value)}
        >
          <option value="">Select a group</option>
          <option value="CASH">Cash</option>
          <option value="BANK_ACCOUNT">Bank Account</option>
          <option value="DEPOSIT">Deposit</option>
          <option value="CREDIT">Credit</option>
          <option value="ASSET">Asset</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="balance">
        <Form.Label>Balance</Form.Label>
        <Form.Control
          type="number"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          placeholder="Enter account balance"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AccountForm;
