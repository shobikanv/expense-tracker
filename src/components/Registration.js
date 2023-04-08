import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Registration() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    if (!name) {
      validationErrors.name = 'Please enter your name'
    }
    if (!email) {
      validationErrors.email = 'Please enter your email'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Please enter a valid email'
    }
    if (!password) {
      validationErrors.password = 'Please enter password'
    } else if (password.length < 8) {
      validationErrors.password = 'Password should be at least 8 characters long'
    }
    if (!confirmPassword) {
      validationErrors.confirmPassword = 'Please confirm password'
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      alert('Form submitted')
    }
  }

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Expense Tracker
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              <Button color="teal" fluid size="large" type="submit">
                Create Account
              </Button>
            </Segment>
          </Form>
          <br></br>
          <div className="mt-3">
            <p className="mb-0 text-center">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </Grid.Column>
      </Grid>
    </div>
  );
}
