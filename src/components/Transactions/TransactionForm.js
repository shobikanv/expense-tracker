import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  DropdownButton,
  Dropdown,
  FloatingLabel,
} from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function TransactionForm({ transaction, onClose }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteTransaction, setDeleteTransaction] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    account: "",
    destination_account: "",
    transaction_type: "EXPENSE",
    amount: "",
    flag: false,
    tags: [],
    note: "",
    amount_currency: "",
  });
  const handleDelete = () => {
    setDeleteTransaction(true);
    console.log("inside handle delete ");
  };

  useEffect(() => {
    if (transaction) {
      setIsEditMode(true);
      setFormData({
        date: transaction?.date || "",
        account: transaction?.account || "",
        destination_account: transaction?.destination_account || "",
        transaction_type: transaction?.transaction_type || "EXPENSE",
        amount: transaction?.amount || "",
        flag: transaction?.flag || false,
        tags: transaction?.tags || [],
        note: transaction?.note || "",
        amount_currency: transaction?.amount_currency || "",
      });
    }
  }, [transaction]);

  console.log("FormData", formData);

  const [accounts, setAccounts] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState(
    transaction?.tags?.map((tag) => ({ value: tag.name, label: tag.name })) ||
      []
  );
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8002/api/accounts/").then((response) => {
      setAccounts(response.data);
    });
    axios.get("http://127.0.0.1:8002/api/transactions/").then((response) => {
      setTransactionTypes(response.data);
    });
    axios.get("http://127.0.0.1:8002/api/tags/").then((response) => {
      setTagOptions(
        response.data.map((tag) => ({ value: tag.name, label: tag.name }))
      );
    });
    axios.get("http://127.0.0.1:8002/api/currencies/").then((response) => {
      setCurrencies(
        response.data.map((currency) => ({
          value: currency[0],
          label: currency[1],
        }))
      );
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      account: formData.account,
      destination_account: formData.destination_account,
      transaction_type: formData.transaction_type,
      amount: formData.amount,
      date: formData.date,
      flag: formData.flag,
      tags: selectedTags.map((tag) => ({ id: tag.id, name: tag.value })),
      note: formData.note,
      amount_currency: formData.amount_currency,
    };

    if (isEditMode && !deleteTransaction) {
      axios
        .put(`http://127.0.0.1:8002/api/transactions/${transaction.id}/`, data)
        .then(() => {
          toast.success("Transaction updated successfully!");
          onClose()
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error);
          alert("Error updating transaction");
        });
    } else if (deleteTransaction && isEditMode) {
      axios
        .delete(
          `http://127.0.0.1:8002/api/transactions/${transaction.id}/`,
          data
        )
        .then(() => {
          alert.success("Transaction deleted successfully!")
          onClose();
        })
        .catch((error) => {
          console.log(error);
          alert("Error deleting account");
        });
    } else {
      axios
        .post("http://127.0.0.1:8002/api/transactions/", data)
        .then(() => {
          toast.success("Transaction added successfully!");
          onClose()
        })
        .catch((error) => {
          console.log(error.response.data);
          console.log(error);
          alert("Error adding transaction");
        });
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (newValue) => {
    setSelectedTags(newValue);
    setFormData({
      ...formData,
      tags: (newValue || []).map((tag) => tag.value),
    });
    (newValue || [])
      .filter((tag) => tag.__isNew__)
      .forEach((tag) => {
        const data = { name: tag.value };
        axios.get("http://127.0.0.1:8002/api/tags/").then((response) => {
          const tags = response.data;
          const tagExists = tags.some(
            (t) => t.name.toLowerCase() === tag.value.toLowerCase()
          );
          if (!tagExists) {
            axios.post("http://127.0.0.1:8002/api/tags/", data).then(() => {
              console.log(`Tag "${tag.value}" added successfully!`);
            });
          } else {
            console.log(`Tag "${tag.value}" already exists!`);
          }
        });
      });
  };

  const handleCurrencyChange = (newValue) => {
    setFormData({
      ...formData,
      amount_currency: newValue.value,
    });
  };

  const handleAnchorClick = (event, type) => {
    event.preventDefault();
    setFormData({ ...formData, transaction_type: type });
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <Card className="shadow px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form className="row g-3" onSubmit={handleSubmit}>
                      <Row>
                        <Form.Group controlId="transactionType">
                          <div className="ui top attached three item menu">
                            <a
                              href="#"
                              className={`red item ${
                                formData.transaction_type === "EXPENSE"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={(e) => handleAnchorClick(e, "EXPENSE")}
                            >
                              Expense
                            </a>
                            <a
                              href="#"
                              className={`black item ${
                                formData.transaction_type === "TRANSFER"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={(e) => handleAnchorClick(e, "TRANSFER")}
                            >
                              Transfer
                            </a>
                            <a
                              href="#"
                              className={`green item ${
                                formData.transaction_type === "INCOME"
                                  ? "active"
                                  : ""
                              }`}
                              onClick={(e) => handleAnchorClick(e, "INCOME")}
                            >
                              Income
                            </a>
                          </div>
                        </Form.Group>
                      </Row>
                      <Col xs={12} md={8}>
                        <Row className="mb-3">
                          <Form.Group controlId="account">
                            <Form.Label>
                              {formData.transaction_type === "EXPENSE"
                                ? "From"
                                : formData.transaction_type === "INCOME"
                                ? "To"
                                : "From"}
                              :
                            </Form.Label>
                            <Form.Control
                              as="select"
                              name="account"
                              onChange={handleInputChange}
                              value={formData.account}
                              required
                            >
                              <option value="">Select an account</option>
                              {accounts.map((account) => (
                                <option key={account.id} value={account.id}>
                                  {account.name} - {account.group}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                          {formData.transaction_type === "TRANSFER" && (
                            <Form.Group controlId="destination_account">
                              <Form.Label>To :</Form.Label>
                              <Form.Control
                                as="select"
                                name="destination_account"
                                onChange={handleInputChange}
                                value={formData.destination_account}
                                required
                              >
                                <option value="">Select an account</option>
                                {accounts.map((account) => (
                                  <option key={account.id} value={account.id}>
                                    {account.name} - {account.group}
                                  </option>
                                ))}
                              </Form.Control>
                            </Form.Group>
                          )}
                        </Row>
                        <Row className="mb-3">
                          {formData.transaction_type !== "TRANSFER" && (
                            <Form.Group controlId="tags">
                              <Form.Label>Tags:</Form.Label>
                              <CreatableSelect
                                isMulti
                                options={tagOptions}
                                onChange={handleTagChange}
                                value={selectedTags}
                              />
                            </Form.Group>
                          )}
                        </Row>
                        <Row>
                          <Form.Group className=" mt-3" controlId="note">
                            <FloatingLabel controlId="note" label="Note">
                              <Form.Control
                                as="textarea"
                                name="note"
                                onChange={handleInputChange}
                                value={formData.note}
                              />
                            </FloatingLabel>
                          </Form.Group>
                        </Row>
                      </Col>
                      <Col xs={6} md={4} className="align-items-center">
                        <Row className=" mb-5">
                          <Form.Group controlId="amount">
                            <Form.Label>Amount:</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type="number"
                                name="amount"
                                onChange={handleInputChange}
                                value={formData.amount}
                                required
                              />

                              <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={formData.amount_currency || "INR"}
                                className="w-25 px-0"
                              >
                                {currencies.map((currency) => (
                                  <Dropdown.Item
                                    key={currency.value}
                                    onSelect={(e) =>
                                      handleCurrencyChange({ value: e })
                                    }
                                  >
                                    {currency.label}
                                  </Dropdown.Item>
                                ))}
                              </DropdownButton>
                            </InputGroup>
                          </Form.Group>
                        </Row>
                        <Row className="mb-5">
                          <Form.Group controlId="date">
                            <Form.Control
                              type="date"
                              name="date"
                              onChange={handleInputChange}
                              value={formData.date}
                              required
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Button type="submit">
                            {isEditMode ? "Save" : "Create"}
                          </Button>
                          {isEditMode && (
                            <Button
                              variant="danger"
                              type="submit"
                              onClick={handleDelete}
                            >
                              Delete
                            </Button>
                          )}
                        </Row>
                      </Col>
                      <Form.Group controlId="flag">
                        <Form.Check
                          type="checkbox"
                          name="flag"
                          label="Flag"
                          onChange={handleInputChange}
                          checked={formData.flag}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
