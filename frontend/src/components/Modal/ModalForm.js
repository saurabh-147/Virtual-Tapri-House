import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const ModalForm = ({ openModal, title, content, children, childrenButtons }) => {
  return (
    <>
      <Modal show={openModal} animation={true}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{content}</p>

          {children()}
        </Modal.Body>

        {childrenButtons()}
      </Modal>
    </>
  );
};

export default ModalForm;
