import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RoomsInOffice from "./RoomsInOffice";
import MembersInOffice from "./MembersInOffice";

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
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Office Name</h1>
            <h5>Description</h5>
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
