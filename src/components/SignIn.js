import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!email) {
      errors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    if (!password) {
      errors.password = "Please enter your password";
    } else if (password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Form submitted");
    }
  };

  return (
    <div>
      <Container>
        <Grid centered verticalAlign="middle" style={{ height: "100vh" }}>
          <Grid.Column mobile={16} tablet={10} computer={6}>
            <Card fluid raised>
              <Card.Content>
                <Card.Header textAlign="center">Expense Tracker</Card.Header>
                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Field error={formErrors.email}>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="name@expense.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {formErrors.email && (
                      <Message error content={formErrors.email} />
                    )}
                  </Form.Field>
                  <Form.Field error={formErrors.password}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {formErrors.password && (
                      <Message error content={formErrors.password} />
                    )}
                  </Form.Field>
                  <Button type="submit" primary fluid>
                    Sign in
                  </Button>
                </Form>
                <div style={{ marginTop: "1rem" }}>
                  <p>
                    Forgot Password?{" "}
                    <Link to="/forgotpassword">Click here</Link>
                  </p>
                  <p>
                    Don't have an account?{" "}
                    <Link to="/registration">Create Account</Link>
                  </p>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}
