import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Container, Form, Button, Table } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import "bootstrap/dist/css/bootstrap.min.css";
import FilterTrans from './FilterTrans';

export default function RecentTrans() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleFilterChange = (filterParams) => {
    setStartDate(filterParams.startDate);
    setEndDate(filterParams.endDate);
    setTransactionType(filterParams.transactionType);
    setSelectedTags(filterParams.selectedTags);
  };

  useEffect(() => {
    axios.get('http://localhost:3003/expenses')
      .then(response => {
        const expenses = response.data.map(expense => ({ ...expense, type: 'expense' }));
        axios.get('http://localhost:3003/income')
          .then(response => {
            const income = response.data.map(income => ({ ...income, type: 'income' }));
            const allTransactions = [...expenses, ...income];

            let filteredTransactions = allTransactions.filter(transaction => {
              if (startDate && new Date(transaction.date) < new Date(startDate)) {
                return false;
              }
              if (endDate && new Date(transaction.date) > new Date(endDate)) {
                return false;
              }
              if (transactionType && transaction.type !== transactionType) {
                return false;
              }
              if (selectedTags.length > 0 && !selectedTags.includes(transaction.tag)) {
                return false;
              }
              return true;
            });

            const sortedTransactions = filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
            const recentTransactions = sortedTransactions.slice(0, 30);
            setTransactions(recentTransactions);
            console.log(allTransactions)
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, [startDate, endDate, transactionType, selectedTags]);
  const getRowStyle = (type) => {
    return type === 'expense' ? { backgroundColor: '#ffe6e6' } : { backgroundColor: '#e6ffe6' };
  };

  return (
    <>

      <Container>
        <h2>Recent Transactions</h2>
        <br></br>
        <FilterTrans onFilterChange={handleFilterChange} />
        <br></br>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Type</th>
              <th>Tag</th>
              <th>Note</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} style={getRowStyle(transaction.type)}>
                <td>{index + 1}</td>
                <td>{transaction.date}</td>
                <td>{transaction.type}</td>
                <td>{transaction.tag}</td>
                <td>{transaction.note}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
