import React, { useEffect, useState } from "react";
import { Accordion, Button, ListGroup } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import axios from "axios";
import "./AccountList.css";
import EditAccountModal from "./EditAccounts";

export default function AccountList({ showEdit = true }) {
  const [accounts, setAccounts] = useState({});
  const [activeKeys, setActiveKeys] = useState(["CASH"]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8002/api/accounts/")
      .then((response) => {
        const accountsData = response.data.reduce((acc, account) => {
          const group = account.group;
          if (!acc[group]) {
            acc[group] = {
              accounts: [],
              totalBalance: 0,
            };
          }
          acc[group].accounts.push(account);
          acc[group].totalBalance += parseFloat(account.balance);
          return acc;
        }, {});
        setAccounts(accountsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accounts]);

  const renderAccounts = (group) => {
    return (
      <ListGroup>
        {accounts[group].accounts.map((account) => (
          <ListGroup.Item
            key={account.id}
            className="d-flex justify-content-between align-items-center"
          >
            <a href={`/transactions/${account.id}`}>{account.name}</a>

            <div
              className={`account-widget-account__balance ${
                account.balance >= 0 ? "positive" : "negative"
              }`}
              key={account.id}
            >
              <div className="mono">{account.balance} INR</div>
              {showEdit && (
                <div className="account-widget-account__edit">
                  <Button
                    variant="link"
                    onClick={() => handlePencilClick(account)}
                  >
                    <FaPen color="grey" />
                  </Button>
                </div>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const handlePencilClick = (account) => {
    setSelectedAccount({
      id: account.id,
      name: account.name,
      group: account.group,
      balance: account.balance,
    });
    setShowEditModal(true);
  };
  const handleAccordionToggle = (eventKey) => {
    setActiveKeys((activeKeys) => {
      if (activeKeys.includes(eventKey)) {
        return activeKeys.filter((key) => key !== eventKey);
      } else {
        return [...activeKeys, eventKey];
      }
    });
  };

  return (
    <>
      <br />
      <Accordion activeKey={activeKeys} onSelect={handleAccordionToggle}>
        {[...Object.keys(accounts)]
          .sort((a, b) => {
            if (a === "CASH") {
              return -1;
            } else if (b === "CASH") {
              return 1;
            } else {
              return 0;
            }
          })
          .map((group) => (
            <Accordion.Item key={group} eventKey={group}>
              <Accordion.Header className="d-flex justify-content-between align-items-center">
                <span style={{ flexGrow: 1, paddingRight: "10px" }}>
                  {group}
                </span>
                <div
                  className={`mono ${
                    accounts[group].totalBalance >= 0 ? "positive" : "negative"
                  } justify-content-end text-allign-right`}
                  style={{ textAlign: "right" }}
                >
                  <span>{accounts[group].totalBalance} INR</span>
                </div>
              </Accordion.Header>

              <Accordion.Body>{renderAccounts(group)}</Accordion.Body>
            </Accordion.Item>
          ))}
        {selectedAccount && showEditModal && (
          <EditAccountModal
            show={showEditModal}
            account={selectedAccount}
            onHide={() => setShowEditModal(false)}
          />
        )}
      </Accordion>
    </>
  );
}
