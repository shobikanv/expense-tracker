import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TestChart() {
  const [dailyReport, setDailyReport] = useState([]);
  useEffect(() => {
    const fetchDailyReport = async () => {
      const response = await axios.get(
        "http://localhost:8002/api/reports/?year=2023&month=03&type=daily"
      );
      setDailyReport(response.data);
    };
    fetchDailyReport();
  }, []);

return (
  <div>
    <h1>Daily Report</h1>
    {Object.values(dailyReport).map((dailyData, index) => (
      <div key={index}>
        <p>Net Income: {dailyData.net_income}</p>
        <p>Net Worth: {dailyData.net_worth}</p>
        <br/>
      </div>
    ))}
  </div>
);

}
