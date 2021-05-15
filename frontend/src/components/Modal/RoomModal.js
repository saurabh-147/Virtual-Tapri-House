import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const RoomModal = ({ openModal, title, children, handleClose }) => {
  return (
    <>
      <Modal show={openModal} animation={true} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default RoomModal;
