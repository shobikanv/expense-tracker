import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import EIForm from "./EIForm";

export default function EditTransactionModal({ show, transaction, onHide }) {

  const handleSubmit = (event) => {
    console.log(transaction);
    event.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8002/api/transactions/${transaction.id}/`,
        transaction
      )
      .then(() => {
        window.location.reload(); // <-- add this line
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EIForm transaction={transaction} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
