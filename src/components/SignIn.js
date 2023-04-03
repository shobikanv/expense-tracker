import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import { Link } from "react-router-dom";


export default function SignIn() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [ferrors,setFerrors]=useState({})
  
    const errors={}
    const handleSubmit=(e)=>{
        e.preventDefault();
    if(!email){
      errors.email="Please enter you email"
    }else if(!/\S+@\S+\.\S+/.test(email)){errors.email="Please enter a valid email"}
    if(!password){
      errors.password="Please enter password"
    }else if(password.length<8){errors.password="Password should be atleast 8 characters long"}

    setFerrors(errors)
    if(Object.keys(errors).length===0){
      alert("FOrm subitted")
    }
  }
  
    return (
      <div>
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12} >

          <div className="border border-2 border-primary"></div>
              <Card className="shadow px-4">
                <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2>Expense Tracker</h2>
                  <div className="mb-3">
                  <Form onSubmit={handleSubmit}>
                    
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Email</Form.Label>
                      <Form.Control 
                      type="email" 
                      placeholder='name@expense.com'
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                      isInvalid={ferrors.email}
                      />
                    <Form.Control.Feedback type='invalid'>{ferrors.email}</Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Password</Form.Label>
                      <Form.Control 
                      type="password" 
                      placeholder='Password'
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                      isInvalid={ferrors.password}
                      />
                    <Form.Control.Feedback type='invalid'>{ferrors.password}</Form.Control.Feedback>
                    </Form.Group >
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center"></Form.Label>
                    </Form.Group>
                    <Button type="submit">Sign in</Button>
                  </Form>
                  <div>
                    <p>Forgot Password??{" "}<Link to="/forgotpassword">Click here</Link></p>
                    <p>Don't have an account??{" "}<Link to="/registration">Create Account</Link></p>
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