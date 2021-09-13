import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import * as BiIcons from "react-icons/bi";

import { getAlltaksOfEmployee, setTaskComplete } from "../../../api/office";
import { isAuthenticated } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: "black",
    margin: "10px",
  },
}));

const EmployeeSideRoom = () => {
  const classes = useStyles();
  const { roomId } = useParams();
  let history = useHistory();

  const [employeeRoom, setEmployeeRoom] = useState([]);
  const { token } = isAuthenticated();

  const preload = () => {
    getAlltaksOfEmployee(token, roomId).then((data) => {
      if (data.success) {
        console.log(data);
        setEmployeeRoom(data.room);
      } else {
        console.log(data.error);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const completeTask = (taskId) => {
    setTaskComplete(token, taskId).then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        console.log(data.error);
      }
    });
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper style={{ background: "blueviolet", color: "white" }} className={classes.paper}>
            <Button onClick={() => history.push("/joinAsEmployee")}>
              <BiIcons.BiArrowBack />
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ color: "white", background: "black" }}>
            <Typography variant="h6">{employeeRoom.name}</Typography>
            <Typography variant="subtitle2">{employeeRoom.description}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          {employeeRoom?.tasks?.map((item, index) => {
            return (
              <Grid key={index} item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle2">{item.description}</Typography>
                  <Button
                    variant="primary"
                    style={{ marginTop: "20px" }}
                    disabled={item.status}
                    onClick={() => {
                      completeTask(item._id);
                    }}
                  >
                    {item.status ? "Task Completed" : "Set Task Complete"}
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </>
  );
};

export default EmployeeSideRoom;
