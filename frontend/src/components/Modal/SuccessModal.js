import React from "react";

import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const SuccessModal = ({ openModal, content, childrenButtons }) => {
  return (
    <>
      <Modal show={openModal} animation={true}>
        <Modal.Body>
          <p>{content}</p>
        </Modal.Body>

        {childrenButtons()}
      </Modal>
    </>
  );
};

export default SuccessModal;
