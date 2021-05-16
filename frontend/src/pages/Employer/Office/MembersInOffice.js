import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addMemberInOffice, getAllMembersInOffice } from "../../../api/office";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { isAuthenticated } from "../../../api/auth";
import * as TiIcons from "react-icons/ti";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: "10px",
  },
}));

const MembersInOffice = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();

  const [emailId, setEmailId] = useState("");
  const [members, setMembers] = useState([]);

  const preload = () => {
    getAllMembersInOffice(token).then((data) => {
      console.log(data);
      if (data.success) {
        setMembers(data.members);
      } else {
        alert(data.error);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const addMember = () => {
    addMemberInOffice(emailId, token).then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.error);
      }
      setEmailId("");
    });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={emailId} name="email" onChange={(e) => setEmailId(e.target.value)} />
        </Form.Group>
        <Button variant="primary" style={{ marginBottom: "20px" }} onClick={addMember}>
          Add
        </Button>
      </Form>
      <Grid container>
        <Grid item xs>
          {members.map((item, index) => {
            return (
              <Paper key={index} className={classes.paper}>
                <TiIcons.TiUser />
                &nbsp; {item.name}
                <br />
                &nbsp; &nbsp; &nbsp; {item.email}
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default MembersInOffice;
