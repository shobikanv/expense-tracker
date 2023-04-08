import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Table, Pagination,Menu } from "semantic-ui-react";
import FilterTrans from './FilterTrans';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleFilterChange = (filterParams) => {
    setStartDate(filterParams.startDate);
    setEndDate(filterParams.endDate);
    setTransactionType(filterParams.transactionType);
    setSelectedTags(filterParams.selectedTags);
    setCurrentPage(3);
  };

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

            let filteredTransactions = allTransactions.filter((transaction) => {
              if (
                startDate &&
                new Date(transaction.date) < new Date(startDate)
              ) {
                return false;
              }
              if (endDate && new Date(transaction.date) > new Date(endDate)) {
                return false;
              }
              if (transactionType && transaction.type !== transactionType) {
                return false;
              }
              if (
                selectedTags.length > 0 &&
                !selectedTags.includes(transaction.tag)
              ) {
                return false;
              }
              return true;
            });

            const sortedTransactions = filteredTransactions.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentTransactions = sortedTransactions.slice(
              startIndex,
              endIndex
            );
            setTransactions(currentTransactions);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [
    startDate,
    endDate,
    transactionType,
    selectedTags,
    currentPage,
    itemsPerPage,
  ]);

  const getRowStyle = (type) => {
    return type === "expense"
      ? { backgroundColor: "#ffe6e6" }
      : { backgroundColor: "#e6ffe6" };
  };

  const pageCount = Math.ceil(transactions.length / itemsPerPage);
  const paginationItems = [];
  for (let i = 1; i <= pageCount; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <Container>
      <FilterTrans onFilterChange={handleFilterChange} />
      <br />
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Transaction</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
            <Table.Body>
      {transactions.map((transaction, index) => (
        <Table.Row
          key={index}
          style={getRowStyle(transaction.type)}
          onClick={() => console.log(`Clicked on transaction #${index}`)}
        >
          <Table.Cell>{transaction.date}</Table.Cell>
          <Table.Cell>{transaction.description}</Table.Cell>
          <Table.Cell>{transaction.amount}</Table.Cell>
          <Table.Cell>
            {transaction.type === "expense" ? "Expense" : "Income"}
          </Table.Cell>
          <Table.Cell>{transaction.tag}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="5">
          <Menu floated="right" pagination>
            <Pagination
              activePage={currentPage}
              totalPages={pageCount}
              onPageChange={(_, { activePage }) => setCurrentPage(activePage)}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              boundaryRange={0}
            />
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
</Container>
  );}
