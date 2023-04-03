import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Accordion, Card, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';
import RecentTrans from './RecentTrans';
import SignIn from './SignIn';
import axios from 'axios';

function IndexPage() {
    const [showExpenseForm, setShowExpenseForm] = useState(true);
    const [showIncomeForm, setShowIncomeForm] = useState(false);
    const [netWorth, setNetWorth] = useState(0);

    const handleExpense = () => {
        setShowExpenseForm(true);
        setShowIncomeForm(false);
    }

    const handleIncome = () => {
        setShowIncomeForm(true);
        setShowExpenseForm(false);
    }
  
    useEffect(() => {
        axios.get('http://localhost:3003/expenses')
          .then(response => {
            const expenses = response.data.map(expense => ({ ...expense, type: 'expense' }));
            const totalExpenses = expenses.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
      
            axios.get('http://localhost:3003/income')
              .then(response => {
                const income = response.data.map(income => ({ ...income, type: 'income' }));
                const totalIncome = income.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
                const netWorth = totalIncome - totalExpenses;
                setNetWorth(netWorth);
                // Do something with totalExpenses and totalIncome, such as updating state or displaying in the UI
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      }); 
      

    return (
        <>
            <Container>
                <Row>
                    <Col className='bg-secondary text-white d-flex justify-content-center align-items-center'>
                        <h3>Net Worth: ${netWorth}</h3>
                    </Col>
                    <Col>
                        <Row>
                            <Col className="p-4 border bg-danger hoverable pointer"onClick={handleExpense}>
                                <Link className="text-decoration-none text-white" to="#">Expense</Link>
                            </Col>
                            <Col className="p-4 border bg-success hoverable" onClick={handleIncome}>
                                <Link style={{textDecoration:"none"}} className="text-white" to="#">Income</Link>
                            </Col>
                        </Row>
                        <Row>
                            {showExpenseForm && <ExpenseForm />}
                            {showIncomeForm && <IncomeForm />}
                        </Row>
                        <Row>
                            <br></br>
                            <br></br>
                        </Row>
                        <Row>
                            <RecentTrans/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default IndexPage;
