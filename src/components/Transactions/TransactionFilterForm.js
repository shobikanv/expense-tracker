import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputGroup, Form, Button, Modal, Col, Row } from "react-bootstrap";
import { FaCalendar, FaPlus, FaFilter, FaRegFile } from "react-icons/fa";
import Select from "react-select";
import TransactionForm from "./TransactionForm";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 
import "./TransactionFilterForm.css";

export default function TransactionFilterForm({ onSubmit }) {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const [fromDate, setFromDate] = useState(last7Days);
  const [toDate, setToDate] = useState(new Date());

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [transactionType, setTransactionType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [newTransModal, setNewTransModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");

  const handleOpen = () => setNewTransModal(true);
  const handleClose = () => setNewTransModal(false);
  const handleFilterClick = () => {
    setShowFilterModal(true);
  };

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
    axios.get("http://127.0.0.1:8002/api/accounts/").then((response) => {
      setAccounts(
        response.data.map((account) => ({
          value: account.name,
          label: account.name,
        }))
      );
    });
  }, []);
  const handleAccountsChange = (selected) => {
    setSelectedAccount(selected.value);
  };
  useEffect(() => {
    onSubmit({
      from_date: fromDate,
      to_date: toDate,
      tags: selectedTags.map((tag) => tag.value).join(","), // save only tag names
      transaction_type: transactionType,
      accounts: selectedAccount,
    });
  }, [fromDate, toDate, selectedTags, transactionType, selectedAccount]);

  const handleTagsChange = (selected) => {
    setSelectedTags(selected);
  };

  const handleDateSelection = (selection) => {
    switch (selection) { 
      case "today":
        console.log("today is clicked");
        const currentDate = new Date(
          Date.UTC(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          )
        );
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
    if (selection === "today") {
      const currentDate = new Date(
        Date.UTC(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        )
      );
      setFromDate(currentDate.toISOString().slice(0, 10));
      setToDate(currentDate.toISOString().slice(0, 10));
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
        <Modal.Title>
          <FaRegFile size={28} />
          New Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TransactionForm />
      </Modal.Body>
    </Modal>
  );
  const FilterModal = (
    <Modal show={showFilterModal} onHide={() => setShowFilterModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Filter Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

        <Form.Group controlId="formAccounts">
          <Form.Label>Accounts</Form.Label>
          <Select
            options={accounts}
            value={selectedAccount}
            onChange={handleAccountsChange}
            placeholder="Select accounts"
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
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setTransactionType("transfer")}
            active={transactionType === "transfer"}
          >
            Transfer
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setTransactionType("income")}
            active={transactionType === "income"}
          >
            Income
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setTransactionType("")}
            active={transactionType === ""}
          >
            All
          </Button>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={() => setShowFilterModal(false)}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <br />

      <Form onSubmit={(e) => onSubmit(e)}>
        <div className="container-header d-flex ">
          <InputGroup
            className="m-0 p-0"
            onClick={handleOpen}
            style={{ cursor: "pointer" }}
          >
            <InputGroup.Text id="btnGroupAddon">
              <FaPlus />
            </InputGroup.Text>
            <Button
              variant="light"
              onClick={handleOpen}
              className="flex-grow-1"
            >
              New
            </Button>
          </InputGroup>
          <InputGroup className="m-0 p-0" style={{ cursor: "pointer" }}>
            <InputGroup.Text id="btnGroupAddon">
              <FaCalendar />
            </InputGroup.Text>
            <Form.Control
              as="select"
              onChange={(e) => handleDateSelection(e.target.value)}
            >
              <option value="all">Select</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 days</option>
              <option value="thisMonth">This month</option>
              <option value="custom">Custom</option>
            </Form.Control>
          </InputGroup>
          <InputGroup
            onClick={() => {
              handleFilterClick();
            }}
            className="m-0 p-0"
            style={{ cursor: "pointer" }}
          >
            <InputGroup.Text id="btnGroupAddon">
              <FaFilter />
            </InputGroup.Text>
          </InputGroup>
        </div>
        {FilterModal}
        {newTransModalForm}
        {dateRangePicker}
      </Form>
      <br />
    </>
  );
}
