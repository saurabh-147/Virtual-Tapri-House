import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signup } from "../../api/auth";

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
      } else {
        alert(data.error);
      }
    });
  };

  return (
    <div className="signup">
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", height: "50vh" }}>
          <TextField id="outlined-basic" type="text" label="Name" variant="outlined" name="name" value={values.name} onChange={handleChange} />
          <TextField id="outlined-basic" type="email" label="Email" variant="outlined" name="email" value={values.email} onChange={handleChange} />
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
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
