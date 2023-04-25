import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AccountForm({ account, onClose }) {
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [balance, setBalance] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);

  const handleDelete = () => {
    setDeleteAccount(true);
  };

  useEffect(() => {
    if (account) {
      setIsEditMode(true);
      setName(account?.name || "");
      setGroup(account?.group || "");
      setBalance(account?.balance || "");
    }
  }, [account]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      group: group,
      balance: balance,
    };
    if (isEditMode && !deleteAccount) {
      axios
        .put(`http://127.0.0.1:8002/api/accounts/${account.id}/`, data)
        .then(() => {
          onClose();
          toast.success("Account updated successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Error updating account");
        });
    } else if (deleteAccount && isEditMode) {
      axios
        .delete(`http://127.0.0.1:8002/api/accounts/${account.id}/`, data)
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.log(error);
          alert("Error deleting account");
        });
    } else {
      axios
        .post("http://127.0.0.1:8002/api/accounts/", data)
        .then((response) => {
          setName("");
          setGroup("");
          setBalance("");
          setAccounts((prevAccounts) => ({
            ...prevAccounts,
            [response.data.id]: response.data,
          }));
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
    <ToastContainer />
      <Container>
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
          <br />
          <Button className="" variant="success" type="submit">
            {isEditMode ? "Save" : "Create"}
          </Button>
          {isEditMode && (
            <Button variant="danger" type="submit" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Form>
        <br />
      </Container>
    </>
  );
}

export default AccountForm;
