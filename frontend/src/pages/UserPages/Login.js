import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import { authenticate, login } from "../../api/auth";
import { Checkbox, Grid, FormControlLabel, Paper, Button } from "@material-ui/core";
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
          window.location.reload();
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
  const formPage = () => {
    return (
      <div style={{ marginLeft: 400, marginRight: 400, marginTop: 50 }}>
        <Paper>
          <Grid container spacing={3} direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid item>
              <TextField label="Email" name="email" value={values.email} onChange={handleChange}></TextField>
            </Grid>
            <Grid item>
              <TextField label="Password" type={"password"} name="password" value={values.password} onChange={handleChange}></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };

  return (
    <div>
      {formPage()}
      {redirectToLoginPage()}
    </div>
  );
};

export default Login;
