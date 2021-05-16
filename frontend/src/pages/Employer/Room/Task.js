import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDrop } from "react-dnd";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
  },
}));

const Task = ({ task, isAssigned }) => {
  const classes = useStyles();

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

  return (
    <Paper className={classes.paper} ref={drop} style={{ background: isAssigned ? "rgb(207,53,46)" : "#8a2be2" }}>
      <Typography align="center" variant="h5">
        {task.name}
      </Typography>
      <br />
      {task.description}
    </Paper>
  );
};

export default Task;
