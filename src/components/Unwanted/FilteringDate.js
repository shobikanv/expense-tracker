import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyComponent() {
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const [fromDate, setFromDate] = useState(last7Days);
  const [toDate, setToDate] = useState(new Date());

  const [selectedOption, setSelectedOption] = useState("last7days");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    switch (event.target.value) {
      case "today":
        setFromDate(new Date());
        setToDate(new Date());
        break;
      case "yesterday":
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setFromDate(yesterday);
        setToDate(yesterday);
        break;
      case "last7days":
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        setFromDate(last7Days);
        setToDate(new Date());
        break;
      case "thisMonth":
        const thisMonth = new Date();
        thisMonth.setDate(1);
        setFromDate(thisMonth);
        setToDate(new Date());
        break;
      case "custom":
        // do nothing here, handle custom date selection separately
        break;
      default:
        // do nothing
        break;
    }
  };

  const handleCustomDateChange = (dates) => {
    const [startDate, endDate] = dates;
    setFromDate(startDate);
    setToDate(endDate);
  };

  const renderDatePicker = () => {
    if (selectedOption === "custom") {
      return (
        <DatePicker
          selected={fromDate}
          onChange={handleCustomDateChange}
          startDate={fromDate}
          endDate={toDate}
          selectsRange
          inline
        />
      );
    }
    return null;
  };

  return (
    <div>
      <label htmlFor="options">Select an option:</label>
      <select id="options" value={selectedOption} onChange={handleOptionChange}>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7days">Last 7 days</option>
        <option value="thisMonth">This month</option>
        <option value="custom">Custom</option>
      </select>
      <div>
        {fromDate && toDate && (
          <div>
            Selected date range: {fromDate.toDateString()} -{" "}
            {toDate.toDateString()}
          </div>
        )}
        {renderDatePicker()}
      </div>
    </div>
  );
}
