import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  CardGroup,
} from "react-bootstrap";
import RecentTrans from "./Transactions/RecentTrans";
import axios from "axios";
import TransactionForm from "./Transactions/TransactionForm";
import AccountsList from "./Accounts/AccountList"

function IndexPage() {

  return (
    <>
      <br />
      <Container>
        <Row>
          <Col>
            <Accordion
              style={{ border: "none" }}
              defaultActiveKey={["0"]}
              alwaysOpen
            >
              <Accordion.Item style={{ border: "none" }} eventKey="0">
                <Accordion.Header style={{ paddingBottom: "10px", border:"none" }}>
                  Net Worth
                </Accordion.Header>
                <Accordion.Body style={{ border: "none" }}>
                  <Row>
                    <AccountsList showEdit={false} />
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs={12} md={8}>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>NEW TRANSACTION</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <TransactionForm />
                  </Row>
                  <Row>
                    <br></br>
                    <br></br>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header> RECENT TRANSACTIONS </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <RecentTrans showFilterForm={false} showEdit={false}/>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default IndexPage;
