import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";

import CreatableSelect from "react-select/creatable";

import { useNavigate } from "react-router-dom";

export default function IncomeForm(){
  const [tag, setTag] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [ferrors, setFerrors] = useState({});
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/income")
      .then((response) => {
        const tags = response.data.map((income) => income.tag);
        const uniqueTags = [...new Set(tags)];
        const options = uniqueTags.map((tag) => ({
          value: tag,
          label: tag,
        }));
        setTagOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const navigate = useNavigate();
  const errors = {};
  const tagHandler = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setTag(values);
  };
  const notehandler = (event) => {
    setNote(event.target.value);
  };
  const amounthandler = (event) => {
    setAmount(event.target.value);
  };
  const datehandler = (event) => {
    setDate(event.target.value);
  };
const handleSubmit = (event) => {
  event.preventDefault();
  let errors = {};
  if (!tag) {
    errors.tag = "Please add tag";
  }
  if (!amount) {
    errors.amount = "Please enter amount";
  }
  if (!date) {
    errors.date = "Please select a date";
  }
  if (Object.keys(errors).length === 0) {
    alert("Form submitted");
    const incomeData = {
      tag: tag,
      note: note,
      amount: amount,
      date: date,
    };
    axios
      .post("http://localhost:3003/income", incomeData)
      .then((response) => {
        alert(response.data);
        console.log(response.data);
        const newTag = response.data.tag;
        const newTagOption = { value: newTag, label: newTag };
        if (!tagOptions.find((option) => option.value === newTag)) {
          setTagOptions([...tagOptions, newTagOption]);
        }
        setTag([]);
        setNote("");
        setAmount("");
        setDate("");
        
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setFerrors(errors);
  }
};


  return (
    <Container>
      <Row>
        <Col>
          <Card className="shadow px-4">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <div className="mb-3"></div>
                <Form className="row g-3" onSubmit={handleSubmit}>
                  <Row>
                    <h6> Income</h6>
                    <Form.Group as={Col}>
                      <Form.Label>Tags</Form.Label>
                      <CreatableSelect
                        isMulti={true}
                        options={tagOptions}
                        onChange={tagHandler}
                        value={tag.map((t) => ({ value: t, label: t }))}
                      />

                      <Form.Control.Feedback type="invalid">
                        {ferrors.tag}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicPassword"
                      onChange={amounthandler}
                    >
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter the amount"
                        isInvalid={ferrors.amount}
                      />
                      <Form.Control.Feedback type="invalid">
                        {ferrors.amount}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Form.Group
                    className="mb-1"
                    controlId="formBasicEmail"
                    onChange={notehandler}
                  >
                    <FloatingLabel label="Note">
                      <Form.Control as="textarea" rows={3} />
                    </FloatingLabel>
                  </Form.Group>

                  <Row className="d-flex justify-content-end align-items-end">
                    <Form.Group as={Col} controlId="formDate">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        onChange={datehandler}
                        isInvalid={ferrors.date}
                      />
                      <Form.Control.Feedback type="invalid">
                        {ferrors.date}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Button type="submit">Add Income</Button>
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
