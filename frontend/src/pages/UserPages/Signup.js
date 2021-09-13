import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { signup } from "../../api/auth";
import { Checkbox, Grid, FormControlLabel, Paper, Button } from "@material-ui/core";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    signup(values).then((data) => {
      if (data.success) {
        alert(data.message);
        setValues(() => {
          return {
            name: "",
            email: "",
            password: "",
          };
        });
      } else {
        alert(data.error);
      }
    });
  };

  const formPage = () => {
    return (
      <div style={{ marginLeft: 400, marginRight: 400, marginTop: 50 }}>
        <Paper>
          <Grid container spacing={3} direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid item>
              <TextField label="Name" name="name" value={values.name} onChange={handleChange}></TextField>
            </Grid>
            <Grid item>
              <TextField label="Email" name="email" value={values.email} onChange={handleChange}></TextField>
            </Grid>
            <Grid item>
              <TextField label="Password" type={"password"} name="password" value={values.password} onChange={handleChange}></TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={onSubmit}>
                SignUp
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  };
  return formPage();
};

export default Signup;
