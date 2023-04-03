import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Registration() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [password, setPassword] = useState("")
  const [ferrors, setFerrors] = useState({})

  const errors = {}


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      errors.name = "Please enter your name"
    }
    if (!email) {
      errors.email = "Please enter you email"
    } else if (!/\S+@\S+\.\S+/.test(email)) { errors.email = "Please enter a valid email" }
    if (!password) {
      errors.password = "Please enter password"
    } else if (password.length < 8) { errors.password = "Password should be atleast 8 characters long" }
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm password"
    } else if (confirmPassword !== password) { errors.confirmPassword = "Passwords do not match" }

    setFerrors(errors)
    if (Object.keys(errors).length === 0) {
      alert("Form submitted")
    }
  }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-2 border-primary"></div>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 >Expense Tracker</h2>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder='Enter your Name'
                          value={name}
                          onChange={(e) => { setName(e.target.value) }}
                          isInvalid={ferrors.name}
                        />
                        <Form.Control.Feedback type='invalid'>{ferrors.name}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder='name@expense.com'
                          value={email}
                          onChange={(e) => { setEmail(e.target.value) }}
                          isInvalid={ferrors.email}
                        />
                        <Form.Control.Feedback type='invalid'>{ferrors.email}</Form.Control.Feedback>
                      </Form.Group >
                      <Form.Group className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label className="text-center">Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder='Password'
                          value={password}
                          onChange={(e) => { setPassword(e.target.value) }}
                          isInvalid={ferrors.password}
                        />
                        <Form.Control.Feedback type='invalid'>{ferrors.password}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3"
                        controlId="formBasicPassword">
                        <Form.Label className="text-center">Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder='Retype password'
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value) }}
                          isInvalid={ferrors.confirmPassword}
                        />
                        <Form.Control.Feedback type='invalid'>{ferrors.confirmPassword}</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label></Form.Label>
                      </Form.Group>
                      <div className="d-grid"></div>
                      <Button type="submit">Create Account</Button>
                    </Form>
                    <br></br>
                    <div className="mt-3">
                      <p className="mb-0 text-center">Already have an account??{" "}<Link to="/signin">Sign In</Link></p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

