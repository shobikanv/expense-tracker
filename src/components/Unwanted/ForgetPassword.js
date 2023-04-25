import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';


function ForgetPassword() {
    const [email, setEmail] = useState("")

    const [ferrors, setFerrors] = useState({})

    const errors = {}
    const handleSubmit = (e) => {
        e.preventDefault(e)
        if (!email) {
            errors.email = "Please enter you email"
        } else if (!/\S+@\S+\.\S+/.test(email)) { errors.email = "Please enter a valid email" }

        setFerrors(errors)
        if (Object.keys(errors).length === 0) {
            alert("FOrm subitted")
        }
    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card>
                            <Card.Body>
                                <h2 className=''>Expense Tracker</h2>
                                <p className='text-muted'>Forgot your password? Don't worry we've got you covered</p>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="email"
                                                placeholder='name@expense.com'
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                isInvalid={ferrors.email}
                                            />
                                            <Form.Control.Feedback type='invalid'>{ferrors.email}</Form.Control.Feedback>
                                            </FloatingLabel>
                                    </Form.Group>
                                    <Button type="submit">Submit</Button>

                                </Form>
                                <br></br>
                                <div>
                                    <p> to Sign In <Link to="/signin">Click here</Link></p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    );

}

export default ForgetPassword;