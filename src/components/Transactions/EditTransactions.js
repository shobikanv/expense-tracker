import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import TransactionForm from "./TransactionForm";

export default function EditTransactionModal({ show, transaction, onHide }) {
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
        <TransactionForm transaction={transaction} onClose={onHide}/>
      </Modal.Body>
      
    </Modal>
  );
}
