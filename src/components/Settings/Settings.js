import { Button, Accordion, Container } from "react-bootstrap";
import { useState } from "react";
import { FaFileExport } from "react-icons/fa";
import TransactionImport from "./Info";
import "./Settings.css";
import CurrencyExchange from "./CurrencyExchange";

function Settings() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleTitleClick = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = text ? text.split("\n").map((row) => row.split(",")) : [];
      const transactions = rows
        .slice(1)
        .map(
          ([
            tags,
            transaction_type,
            amount,
            date,
            flag,
            note,
            account,
            destination_account,
          ]) => ({
            tags: tags ? tags.split("|") : [],
            transaction_type: transaction_type || null,
            amount: amount || null,
            date: date || null,
            flag: flag === "true",
            note: note || "",
            account: account || null,
            destination_account: destination_account || null,
          })
        );
      console.log(transactions);

      try {
        const response = await fetch(
          "http://127.0.0.1:8002/api/transactions/import",
          {
            method: "POST",
            body: JSON.stringify(transactions),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data imported successfully:", data);
      } catch (error) {
        console.error("Error importing transactions:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleExport = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8002/api/transactions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filename = "transactions.json";
      const blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting transactions:", error);
    }
  };

  return (
    <>
      <Container className="settings-container">
        <Accordion className="settings-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => handleTitleClick(0)}>
              <h2> Currency Exchange Table</h2>
            </Accordion.Header>
            <Accordion.Body>
              <CurrencyExchange />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <br />
        <br />
        <Accordion className="settings-accordion">
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h2>Data Import</h2>
            </Accordion.Header>
            <Accordion.Body>
              <TransactionImport />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <br />
        <br />
        <Accordion className="settings-accordion">
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={() => handleTitleClick(2)}>
              <h2>Data Export</h2>
            </Accordion.Header>
            <Accordion.Body>
              <div className="section__body">
                <div className="mt-dataExport">
                  <p>Export transactions to a JSON file.</p>
                  <Button variant="outline-primary" onClick={handleExport}>
                    <i aria-hidden="true" className="download icon"></i>
                    Export Transactions
                  </Button>
                </div>
              </div>
              
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

export default Settings;
