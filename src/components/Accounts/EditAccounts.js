import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaRegFile } from "react-icons/fa";
import AccountForm from "./AccountForm";

export default function EditAccountModal({ show, account, onHide }) {
    console.log("Accountss",account)
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
          <FaRegFile size={28} /> Edit Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AccountForm account={account} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
}
