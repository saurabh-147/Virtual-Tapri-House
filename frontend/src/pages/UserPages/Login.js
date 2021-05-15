import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { authenticate, login } from "../../api/auth";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [didRedirect, setDidRedirect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onSubmit = () => {
    //
    login(values).then((data) => {
      if (data.success) {
        authenticate(data.data, () => {
          setDidRedirect(true);
        });
      } else {
        alert(data.error);
      }
    });
  };

  const redirectToLoginPage = () => {
    if (didRedirect) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="login">
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: "50vh" }}>
          <TextField id="outlined-basic" label="Email" variant="outlined" name="email" value={values.email} onChange={handleChange} />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={onSubmit}>
            Login
          </Button>
        </div>
      </form>
      {redirectToLoginPage()}
    </div>
  );
};

export default Login;
