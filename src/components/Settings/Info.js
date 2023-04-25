import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
function TransactionImport() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8002/api/transactions/import/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose a CSV file:</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      {message && (
        <Alert variant={message.includes("Error") ? "danger" : "success"}>
          {message}
        </Alert>
      )}
    </div>
  );
}
export default TransactionImport;
