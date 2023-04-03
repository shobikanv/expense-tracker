import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

export default function Analytics() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/expenses')
      .then(response => {
        setExpenses(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const tags = expenses.map(expense => expense.tag);
  const amounts = expenses.map(expense => parseFloat(expense.amount));
  const pieData = {
    series: amounts,
    options: {
      labels: tags,
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div>
      <div className='container-fluid'>
        <br></br>
        <h2 className='centered'>Analytics of your Expenses</h2>
        <div className='row'>
          <div className='col-md-6'>
            <Chart
              type='pie'
              width={500}
              height={300}
              {...pieData}
            />
          </div>
         
           
          </div>
        </div>
      </div>
    
  );
}
