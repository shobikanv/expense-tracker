import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

export default function FilterTrans({ onFilterChange }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleFilterClick = () => {
    const filterParams = {
      startDate: startDate,
      endDate: endDate,
      transactionType: transactionType,
      selectedTags: selectedTags,
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilterClick();
        }}
      >
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

          <Col className="d-flex align-items-end ">
            <div className="mt-auto">
              <Button
                variant="primary"
                type="submit"
                onClick={handleFilterClick}
              >
                Filter
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleClearClick}
              >
                Clear
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
