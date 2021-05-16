import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDrop } from "react-dnd";
import { userDetailsOfTaskAssigned } from "../../../api/office";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),

    color: "white",
    "&:hover": {
      background: "black",
      color: "black",
      opacity: 0.3,
    },
  },
}));

const findColor = (isAssigned, status) => {
  if (isAssigned) {
    return status ? "#83D475" : "rgb(207,53,46)";
  } else {
    return "#8a2be2";
  }
};

const Task = ({ task, isAssigned }) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "BOX",
      drop: () => ({
        name: `${task.name}`,
        task: `${task._id}`,
        isAssigned,
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [task]
  );
  const preload = () => {
    userDetailsOfTaskAssigned(task._id).then((data) => {
      if (data.success) {
        setName(data.tasksAssingedToUser);
        console.log(data.tasksAssingedToUser);
      }
    });
  };

  useEffect(() => {
    if (isAssigned) {
      preload();
    }
  }, []);

  const color = findColor(isAssigned, task.status);

  return (
    <Paper className={classes.paper} ref={drop} style={{ background: color }}>
      <Typography align="center" variant="h5">
        {task.name}
      </Typography>
      <br />
      {task.description}
      <Typography align="right" variant="h6">
        {name}
      </Typography>
    </Paper>
  );
};

export default Task;
