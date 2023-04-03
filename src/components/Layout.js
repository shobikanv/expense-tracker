import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react';


import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
 
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="indexPage">Expense tracker</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <div className="row">
          <div className="bg-dark col-md-2">
            <Nav className="flex-column">
            <Link className="text-decoration-none text-white" to="expense-form">Expense</Link>
            <Link className="text-decoration-none text-white" to="income-form">Income</Link>
            <Link className="text-decoration-none text-white"  to="recent-trans">Recent Transactions</Link>

            <Link className="text-decoration-none text-white" to="analytics">Analytics</Link>
            </Nav>
          </div>
          <div className="col-md-9">
            <Outlet />
          </div>
        </div>
      </Container>
    </>

  );
}

export default Layout;