import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  FaNewspaper,
  FaExchangeAlt,
  FaCreditCard,
  FaChartLine,
  FaShoppingBasket,
  FaCog,
  FaSyncAlt,
} from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Dashboard");

  useEffect(() => {
    const path = location.pathname;
    let name = "";
    switch (path) {
      case "/":
        name = "Dashboard";
        break;
      case "/recent-trans":
        name = "Transactions";
        break;
      case "/account":
        name = "Accounts";
        break;
      case "/analytics":
        name = "Reports";
        break;
      case "/budget":
        name = "Budget";
        break;
      case "/settings":
        name = "Settings";
        break;
      default:
        name = "Dashboard";
    }
    setCurrentPage(name);
  }, [location]);
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        className="position-fixed border h-100 flex-column align-items-start mt-5 sticky-top"
        style={{ top: "6px", left: 0 }}
      >
        <Nav className="flex-column mr-auto py-2 justify-content-center">
          <Nav.Link
            href="/"
            active={currentPage === "Dashboard"}
            className={`pb-3 text-center ${
              currentPage === "Dashboard" ? "active-link" : ""
            }`}
          >
            <FaNewspaper />
            <br />
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="/recent-trans"
            active={currentPage === "Transactions"}
            className={`pb-3 text-center ${
              currentPage === "Transactions" ? "active-link" : ""
            }`}
          >
            <FaExchangeAlt />
            <br />
            Transactions
          </Nav.Link>
          <Nav.Link
            href="/account"
            active={currentPage === "Accounts"}
            className={`pb-3 text-center ${
              currentPage === "Accounts" ? "active-link" : ""
            }`}
          >
            <FaCreditCard />
            <br />
            Accounts
          </Nav.Link>
          <Nav.Link
            href="/analytics"
            active={currentPage === "Reports"}
            className={`pb-3 text-center ${
              currentPage === "Reports" ? "active-link" : ""
            }`}
          >
            <FaChartLine />
            <br />
            Reports
          </Nav.Link>
          <Nav.Link
            href="/budget"
            active={currentPage === "Budget"}
            className={`pb-3 text-center ${
              currentPage === "Budget" ? "active-link" : ""
            }`}
          >
            <FaShoppingBasket />
            <br />
            Budget
          </Nav.Link>
          <Nav.Link
            href="/settings"
            active={currentPage === "Settings"}
            className={`pb-3 text-center ${
              currentPage === "Settings" ? "active-link" : ""
            }`}
          >
            <FaCog />
            <br /> Settings
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar
        variant="dark"
        sticky="top"
        className="d-flex justify-content-between"
        style={{ backgroundColor: "#3f51b5" }}
      >
        <div
          className="d-flex align-items-center"
          style={{ marginLeft: "40px" }}
        >
          <Navbar.Brand>
            <AiFillDollarCircle size={45} />
          </Navbar.Brand>
          <Navbar.Text
            className="my-custom-text pl-3"
            style={{ paddingLeft: "30px" }}
          >
            {currentPage}
          </Navbar.Text>
        </div>
        <Nav.Link onClick={handleRefresh} className="my-custom-text ml-auto">
          <FaSyncAlt />
        </Nav.Link>
      </Navbar>

      <div style={{ marginLeft: "130px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
