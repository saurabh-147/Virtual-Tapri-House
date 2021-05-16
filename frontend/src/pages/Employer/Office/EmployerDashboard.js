import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RoomsInOffice from "./RoomsInOffice";
import MembersInOffice from "./MembersInOffice";
import { officeDetailsForEmployer } from "../../../api/office";
import { isAuthenticated } from "../../../api/auth";
import Typography from "@material-ui/core/Typography";

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

const EmployerDashboard = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();
  const [officeDetails, setofficeDetails] = useState();

  const preload = () => {
    officeDetailsForEmployer(token).then((data) => {
      if (data.success) {
        setofficeDetails(data.officeDetails);
      } else {
        console.log(data.error);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Office Name - {officeDetails.name}</Typography>
            <Typography variant="subtitle1">Description - {officeDetails.description}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>
            <MembersInOffice />
          </Paper>
        </Grid>
        <Grid item md={9} xs={12}>
          <Paper className={classes.paper}>
            <RoomsInOffice />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployerDashboard;
