import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./components/IndexPage";
import "./components/App.css";
import RecentTrans from "./components/Transactions/RecentTrans";
import TransactionForm from "./components/Transactions/TransactionForm";
import AccountForm from "./components/Accounts/AccountSetup";
import TransactionFilterForm from "./components/Transactions/TransactionFilterForm";
import TransactionAnalytics from "./components/Reports";
import MyComponenet from "./components/Unwanted/FilteringDate";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />

          <Route path="account" element={<AccountForm />} />
          <Route path="transactions" element={<TransactionForm />} />
          <Route path="recent-trans" element={<RecentTrans />} />
          <Route path="charts" element={<TransactionAnalytics />} />
          <Route path="filter-trans" element={<TransactionFilterForm />} />
          <Route path="settings" element={<Settings />} />

          <Route path="*" element={<MyComponenet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
