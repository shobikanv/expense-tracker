import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Modal, Col, Row } from "react-bootstrap";
import { FaCalendar, FaPlus } from "react-icons/fa";
import Select from "react-select";
import TransactionForm from "./TransactionForm";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

export default function TransactionFilterForm({ onSubmit }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTransModal, setNewTransModal] = useState(false);

  const handleOpen = () => setNewTransModal(true);
  const handleClose = () => setNewTransModal(false);

  const handleDateRangeSelection = (ranges) => {
    const range = ranges.selection;
    setFromDate(range.startDate.toISOString().slice(0, 10));
    setToDate(range.endDate.toISOString().slice(0, 10));
  };

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

  const handleDateSelection = (selection) => {
    switch (selection) {
      case "today":
        setFromDate(new Date().toISOString().slice(0, 10));
        setToDate(new Date().toISOString().slice(0, 10));
        break;
      case "yesterday":
        const yesterday = new Date(Date.now() - 86400000);
        setFromDate(yesterday.toISOString().slice(0, 10));
        setToDate(yesterday.toISOString().slice(0, 10));
        break;
      case "last7days":
        const last7days = new Date(Date.now() - 7 * 86400000);
        setFromDate(last7days.toISOString().slice(0, 10));
        setToDate(new Date().toISOString().slice(0, 10));
        break;
      case "thisMonth":
        const today = new Date();
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        setFromDate(firstDayOfMonth.toISOString().slice(0, 10));
        setToDate(lastDayOfMonth.toISOString().slice(0, 10));
        break;
      default:
        setShowModal(true);
        break;
    }
  };

  const dateRangePicker = (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Select date range</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DateRangePicker
          ranges={[
            {
              startDate: new Date(fromDate),
              endDate: new Date(toDate),
              key: "selection",
            },
          ]}
          onChange={handleDateRangeSelection}
          maxDate={new Date()}
          direction="horizontal"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => setShowModal(false)}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
  const newTransModalForm = (
    <Modal
      show={newTransModal}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TransactionForm />
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <br />

      <Form onSubmit={handleSubmit}>
        <div className="container-header">
          <Row md={6}>
            <Button
              as={Col}
              variant="light"
              className="d-flex align-items-center border rounded-0"
              onClick={handleOpen}
            >
              <FaPlus className="me-2" />
              New
            </Button>
            {newTransModalForm}

            <Form.Group controlId="formDate">
              <Button
                as={Col}
                variant="light"
                className="d-flex align-items-center border rounded-0"
              >
                <FaCalendar className="me-2" />
                <Form.Control
                  as="select"
                  onChange={(e) => handleDateSelection(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 days</option>
                  <option value="thisMonth">This month</option>
                  <option value="custom">Custom</option>
                </Form.Control>
                
              </Button>
            </Form.Group>
          </Row>
        </div>


    
      {dateRangePicker}

      <Form.Group controlId="formTags">
        <Form.Label>Tags</Form.Label>
        <Select
          isMulti
          options={tags}
          onChange={handleTagsChange}
          value={selectedTags}
          placeholder="Select tags"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Form.Group>
      <Form.Group controlId="formTransactionType">
        <Form.Label>Transaction type</Form.Label>
        <br />
        <Button
          variant="outline-secondary"
          onClick={() => setTransactionType("expense")}
          active={transactionType === "expense"}
        >
          Expense
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => setTransactionType("income")}
          active={transactionType === "income"}
        >
          Income
        </Button>{" "}
        <Button
          variant="outline-secondary"
          onClick={() => setTransactionType("")}
          active={transactionType === ""}
        >
          All
        </Button>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}
