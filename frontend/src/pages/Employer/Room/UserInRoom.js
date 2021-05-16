import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDrag, DragPreviewImage } from "react-dnd";

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

const UserInRoom = ({ roomMember }) => {
  const classes = useStyles();

  const [{}, drag, preview] = useDrag(() => ({
    type: "BOX",
    item: { mem: roomMember._id },
    end(item, monitor) {
      const dropResult = monitor.getDropResult();
      console.log(dropResult);

      console.log(item);
    },
  }));

  return (
    <>
      <DragPreviewImage connect={preview} />
      <Paper className={classes.paper} ref={drag}>
        &nbsp; {roomMember.name}
        <br />
        &nbsp; &nbsp; &nbsp; {roomMember.email}
        <br />
      </Paper>
    </>
  );
};

export default UserInRoom;
