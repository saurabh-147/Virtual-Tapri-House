import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDrag, DragPreviewImage } from "react-dnd";
import { assignTaskToUser } from "../../../api/office";
import { isAuthenticated } from "../../../api/auth";

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

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "BOX",
      item: { user: roomMember },

      end(item, monitor) {
        const dropResult = monitor.getDropResult();

        if (dropResult) {
          if (!dropResult.isAssigned) {
            const { token } = isAuthenticated();

            assignTaskToUser(token, dropResult.task, item.user._id).then((data) => {
              if (data.success) {
                alert("Task " + dropResult.name + " assigned to user " + item.user.name);
              } else {
                alert("Task already assigned");
              }
            });
          } else {
            alert("Task already assigned");
          }
        }

        console.log(dropResult);
        console.log(item);
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [roomMember]
  );

  return (
    <>
      <Paper className={classes.paper} ref={drag} style={{ opacity }}>
        &nbsp; {roomMember.name}
        <br />
        &nbsp; &nbsp; &nbsp; {roomMember.email}
        <br />
      </Paper>
    </>
  );
};

export default UserInRoom;
