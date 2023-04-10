import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Button, Badge } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaPen } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RecentTrans.css";
import TransactionFilterForm from "./TransactionFilterForm";
import EditTransactionModal from "./EditTransactions";

export default function RecentTrans() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8002/api/accounts/")
      .then((response) => {
        const accountsData = response.data.reduce((acc, account) => {
          acc[account.id] = account;
          return acc;
        }, {});
        setAccounts(accountsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8002/api/transactions/")
      .then((response) => {
        const transactionsData = response.data.map((transaction) => ({
          ...transaction,
          accountName: accounts[transaction.account]?.name || "Unknown",
          type: transaction.transaction_type,
        }));

        const sortedTransactions = transactionsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const recentTransactions = sortedTransactions.slice(0, 30);
        setTransactions(recentTransactions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accounts]);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "short" };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  const handleFilterSubmit = (filters) => {
    const url = "http://127.0.0.1:8002/api/transactions/";
    const params = new URLSearchParams(filters).toString();
    setLoading(true);
    axios
      .get(`${url}?${params}`)
      .then((response) => {
        const transactionsData = response.data.map((transaction) => ({
          ...transaction,
          accountName: accounts[transaction.account]?.name || "Unknown",
          type: transaction.transaction_type,
        }));

        const sortedTransactions = transactionsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const recentTransactions = sortedTransactions.slice(0, 30);
        setTransactions(recentTransactions);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };
  return (
    <Container fluid className="recent-trans-container">
      <TransactionFilterForm onSubmit={handleFilterSubmit} />
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
                  <div className="transaction-item__account">
                    {accounts[transaction.account].name}
                  </div>
                  {transaction.type === "INCOME" ? (
                    <FaArrowLeft color="grey" />
                  ) : (
                    <FaArrowRight color="grey" />
                  )}

                  <div className="transaction-item__tag-or-destination">
                    {transaction.type === "TRANSFER"
                      ? accounts[transaction.destination_account].name
                      : transaction.tags && transaction.tags.length > 0
                      ? transaction.tags.map((tag, index) => (
                          <Badge className="custom-badge" key={index}>
                            {tag.name}
                          </Badge>
                        ))
                      : ""}
                  </div>

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
                    transaction.type === "INCOME"
                      ? "mono positive"
                      :transaction.type === "EXPENSE" 
                      ? "mono negative":"mono"
                  }
                >
                  {transaction.amount} {transaction.currency}
                </span>
              </div>
              <div className="transaction-item__edit">
                <Button
                  variant="link"
                  onClick={() => handleEditClick(transaction)}
                >
                  <FaPen color="grey" />
                </Button>
                {selectedTransaction && (
                  <EditTransactionModal
                    show={showModal}
                    transaction={selectedTransaction}
                    onHide={() => setShowModal(false)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Container>
  );
}
