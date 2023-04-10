import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import Analytics from "./components/Analytics";
import Layout from "./components/Layout";
import NoPage from "./components/NoPage";
import Registration from "./components/Registration";
import SignIn from "./components/SignIn";
import ExpenseForm from "./components/ExpenseForm";
import IncomeForm from "./components/IncomeForm";
import IndexPage from "./components/IndexPage";
import "./components/App.css";
import RecentTrans from "./components/RecentTrans";
import TransactionForm from "./components/TransactionForm";
import EIForm from "./components/EIForm";
import AccountForm from "./components/AccountSetup";
import TransactionFilterForm from "./components/TransactionFilterForm";

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

          <Route path="filter-trans" element={<TransactionFilterForm />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
