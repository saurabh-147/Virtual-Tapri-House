import React, { useEffect, useState } from "react";
import { isAuthenticated, updateValuesInLocalStorage } from "../../api/auth";
import ModalForm from "../../components/Modal/ModalForm";
import { Button, Form } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { createOfficeForEmployer } from "../../api/office";
import SuccessModal from "../../components/Modal/SuccessModal";
import EmployerDashboard from "./EmployerDashboard";

const EmployerOffice = () => {
  const { token, user } = isAuthenticated();

  const [haveoffice, setHaveoffice] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showOfficeForm, setShowOfficeForm] = useState(true);

  const checkIfUserHasOffice = () => {
    if (user.haveOffice) {
      setShowOfficeForm(false);
      setHaveoffice(true);
    }
  };

  useEffect(() => {
    checkIfUserHasOffice();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createOffice = () => {
    if (!values.name || !values.description) {
      alert("Please Fill The Required Details");
    }

    createOfficeForEmployer(values, token).then((data) => {
      if (data.success) {
        updateValuesInLocalStorage(data.user);
        setShowOfficeForm(false);
        setShowSuccessModal(true);
      } else {
        alert(data.error);
      }
    });
  };

  const OkButtonAfterSuccess = () => {
    return (
      <>
        <Button
          variant="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            setShowSuccessModal(false);
            setHaveoffice(true);
          }}
        >
          Press OK
        </Button>
      </>
    );
  };

  const childFormButtons = () => {
    return (
      <>
        <Button variant="primary" style={{ marginBottom: "20px" }} onClick={createOffice}>
          Create Office
        </Button>
        <Button as={Link} variant="danger" to="/">
          Back
        </Button>
      </>
    );
  };

  const childForm = () => {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Office Name</Form.Label>
          <Form.Control type="text" value={values.name} name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={values.description} name="description" onChange={handleChange} />
        </Form.Group>
      </Form>
    );
  };

  return (
    <>
      {!haveoffice && (
        <>
          <ModalForm
            openModal={showOfficeForm}
            title="Create Office"
            content=" Woohoo, you're just few steps to create a new office"
            children={childForm}
            childrenButtons={childFormButtons}
          />
          <SuccessModal openModal={showSuccessModal} content="Woooo , Your Office is Created" childrenButtons={OkButtonAfterSuccess} />
        </>
      )}

      {haveoffice && (
        <>
          <EmployerDashboard />
        </>
      )}
    </>
  );
};

export default EmployerOffice;
