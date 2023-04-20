import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import { Col, Row, Container, Form, Button, Table } from "react-bootstrap";

export default function Analytics() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/expenses")
      .then((response) => {
        setExpenses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tagsDict = {};
  expenses.forEach((expense) => {
    if (Array.isArray(expense.tag)) {
      expense.tag.forEach((tag) => {
        if (tagsDict.hasOwnProperty(tag)) {
          tagsDict[tag] += parseFloat(expense.amount);
        } else {
          tagsDict[tag] = parseFloat(expense.amount);
        }
      });
    } else {
      if (tagsDict.hasOwnProperty(expense.tag)) {
        tagsDict[expense.tag] += parseFloat(expense.amount);
      } else {
        tagsDict[expense.tag] = parseFloat(expense.amount);
      }
    }
  });

  const tags = Object.keys(tagsDict);
  const amounts = Object.values(tagsDict);
  const pieData = {
    series: amounts,
    options: {
      labels: tags,
      legend: {
        position: "bottom",
      },
    },
  };

  const groupedByMonth = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date);
    const month = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
    acc[month] = (acc[month] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const months = Object.keys(groupedByMonth);
  const barData = {
    series: [
      {
        data: months.map((month) => groupedByMonth[month]),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: months,
      },
      yaxis: {
        title: {
          text: "Amount",
        },
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <Container>
      <h2 className="centered">Analytics of your Expenses</h2>
      <Row>
        <Col>
          <Chart type="pie" width={500} height={300} {...pieData} />
        </Col>
        <Col>
          <Chart type="bar" width={500} height={300} {...barData} />
        </Col>
      </Row>
    </Container>
  );
}
