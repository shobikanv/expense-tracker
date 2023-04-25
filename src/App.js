import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/Unwanted/ForgetPassword";
import Analytics from "./components/Unwanted/Analytics";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Registration from "./components/Unwanted/Registration";
import SignIn from "./components/Unwanted/SignIn";
import ExpenseForm from "./components/Unwanted/ExpenseForm";
import IncomeForm from "./components/Unwanted/IncomeForm";
import IndexPage from "./components/IndexPage";
import "./components/App.css";
import RecentTrans from "./components/Transactions/RecentTrans";
import TransactionForm from "./components/Transactions/TransactionForm";
import EIForm from "./components/Unwanted/EIForm";
import AccountForm from "./components/Accounts/AccountSetup";
import TransactionFilterForm from "./components/Transactions/TransactionFilterForm";
import TransactionAnalytics from "./components/Reports";
import MyComponenet from "./components/Unwanted/FilteringDate";
import CurrencyExchange from "./components/Settings/CurrencyExchange";
import Settings from "./components/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="forgotpassword" element={<ForgetPassword />} />
          <Route path="expense-form" element={<ExpenseForm />} />
          <Route path="income-form" element={<IncomeForm />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="trans" element={<EIForm />} />

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
