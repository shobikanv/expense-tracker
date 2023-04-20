import React,{useState} from "react";
import { Button,Container,Card,InputGroup,Modal } from "react-bootstrap";
import {FaPlus} from "react-icons/fa"
import AccountList from "./AccountList";
import AccountForm from "./AccountForm";

function AccountSetup() {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Container style={{ margin: "1em auto", maxWidth: "960px" }}>
        <br />
        
          <InputGroup
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <InputGroup.Text id="btnGroupAddon">
              <FaPlus />
            </InputGroup.Text>
            <Button variant="light">New</Button>
          </InputGroup>
        

        <AccountList showEdit={true}/>

      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccountForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountSetup;
