import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight,FaPen } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecentTrans.css";

export default function RecentTrans() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3003/expenses")
      .then((response) => {
        const expenses = response.data.map((expense) => ({
          ...expense,
          type: "expense",
        }));
        axios
          .get("http://localhost:3003/income")
          .then((response) => {
            const income = response.data.map((income) => ({
              ...income,
              type: "income",
            }));
            const allTransactions = [...expenses, ...income];

            const sortedTransactions = allTransactions.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            const recentTransactions = sortedTransactions.slice(0, 30);
            setTransactions(recentTransactions);
            console.log(recentTransactions);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <Container fluid className="recent-trans-container">
      <div className="transactions-list__wrapper">
        {loading ? (
          <div className="dimmer">
            <Spinner animation="border" />
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <div className="transaction-item" key={index}>
              <div className="transaction-item__date">
                {formatDate(transaction.date)}
              </div>
              <div className="transaction-item__info-wrapper">
                <div className="transaction-item__info">
                  {transaction.type === "income" ? (
                    <FaArrowLeft color="grey" />
                  ) : (
                    <FaArrowRight color="grey" />
                  )}
                  {transaction.tag &&
                    Array.isArray(transaction.tag) &&
                    transaction.tag.map((tag, index) => (
                      <Badge className="custom-badge" key={index}>
                        {tag}
                      </Badge>
                    ))}
                  {transaction.note && (
                    <div
                      style={{
                        fontSize: "1rem",
                        color: "#929293",
                        paddingLeft: "0.5em",
                      }}
                    >
                      {transaction.note}
                    </div>
                  )}
                </div>
              </div>
              <div className="transaction-item__amount">
                <span
                  className={
                    transaction.type === "income"
                      ? "mono positive"
                      : "mono negative"
                  }
                >
                  {transaction.amount} {transaction.currency}
                </span>
              </div>
              <div className="transaction-item__edit">
                <Button variant="link">
                  <FaPen color="grey"/>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
