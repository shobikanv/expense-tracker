import React, { useState } from "react";
import { Col, Row, Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import "bootstrap/dist/css/bootstrap.min.css";

export default function IncomeForm() {
    const [tag, setTag] = useState("");
    const [note, setNote] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [ferrors, setFerrors] = useState({})

  const errors = {}
    const taghandler = (event) => {
        setTag(event.target.value);
    };
    const notehandler = (event) => {
        setNote(event.target.value);
    }
    const amounthandler = (event) => {
        setAmount(event.target.value);
    }
    const datehandler = (event) => {
        setDate(event.target.value);
    }
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
            date: date
          };
          axios.post("http://localhost:3003/income", incomeData)
            .then(response => {
              alert(response.data)
              console.log(response.data);
              setTag("");
              setNote("");
              setAmount("");
              setDate("");
            })
            .catch(error => {
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
                                    <h3> Income</h3>
                                        <Form.Group as={Col}>
                                            <FloatingLabel label="Tags">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter tags..."
                                                    list="tagOptions"
                                                    onChange={taghandler}
                                                    isInvalid={ferrors.tag}
                                                />
                                                <Form.Control.Feedback type='invalid'>{ferrors.tag}</Form.Control.Feedback>
                                                <datalist id="tagOptions">
                                                    <option value="Salary" />
                                                    <option value="" />
                                                    <option value="Capital gains" />
                                                    <option value="business gains" />
                                                    <option value="Other" />
                                                </datalist>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="formBasicPassword" onChange={amounthandler}>
                                            <FloatingLabel label="Amount">
                                                <Form.Control type="number" placeholder="Enter the amount" isInvalid={ferrors.amount} />
                                                <Form.Control.Feedback type='invalid'>{ferrors.amount}</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-1" controlId="formBasicEmail" onChange={notehandler}>
                                        <FloatingLabel label="Note">
                                            <Form.Control as="textarea" rows={3} />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Row className="d-flex justify-content-end align-items-end">
                                        <Form.Group as={Col} controlId="formDate" >
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type="date" onChange={datehandler} isInvalid={ferrors.date}/>
                                            <Form.Control.Feedback type='invalid'>{ferrors.date}</Form.Control.Feedback>
                                        
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Button type="submit" >
                                                Add Income
                                            </Button>
                                        </Form.Group>
                                    </Row>

                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
}
