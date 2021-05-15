import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { addMembersToRoom, getAllMembersInOffice, membersInRoom } from "../../api/office";
import { isAuthenticated } from "../../api/auth";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as TiIcons from "react-icons/ti";
import RoomTask from "./RoomTask";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: "10px",
  },
  paper2: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    margin: "10px",
  },
}));

const EmployerSideRoom = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();
  const { roomId } = useParams();

  const [members, setMembers] = useState([]);
  const [roomMembers, setRoomMembers] = useState([]);

  const preload1 = async () => {
    getAllMembersInOffice(token).then(async (data) => {
      if (data.success) {
        await setMembers(data.members);
        await preload2();
      } else {
        alert(data.error);
      }
    });
  };
  const preload2 = () => {
    membersInRoom(token, roomId).then((data) => {
      if (data.success) {
        setRoomMembers(data.membersInRoom);
        console.log(members);
        var leftMembers = members.filter(function (val) {
          return roomMembers.indexOf(val) == -1;
        });
        console.log(leftMembers);

        setMembers(leftMembers);
      } else {
        alert(data.error);
      }
    });
  };

  useEffect(() => {
    if (members.length === 0) {
      preload1();
    }
  }, []);

  const addUserToRoom = (userId) => {
    addMembersToRoom(token, roomId, userId).then((data) => {
      if (data.success) {
        alert(data.message);
      } else {
        alert(data.error);
      }
    });
  };

  const MovableUserInRoom = () => {
    const [{ isDragging }, drag] = useDrag({
      type: "Irrelevant, for now'",

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
      <>
        {roomMembers.map((item, index) => {
          return (
            <Paper key={index} className={classes.paper2} ref={drag} style={{ opacity }}>
              <TiIcons.TiUser />
              &nbsp; {item.name}
              <br />
              &nbsp; &nbsp; &nbsp; {item.email}
              <br />
            </Paper>
          );
        })}
      </>
    );
  };

  const membersPanel = () => {
    return (
      <Grid item xs>
        <Paper className={classes.paper}>
          <Typography align="center" variant="h6">
            Members in office
          </Typography>
          <Grid container>
            <Grid item xs>
              {members.map((item, index) => {
                return (
                  <Paper key={index} className={classes.paper2}>
                    <TiIcons.TiUser />
                    <Grid container direction="row" justify="space-between" alignItems="center">
                      <Grid item>
                        {item.name}
                        <br />
                        {item.email}
                      </Grid>
                      <Grid item>
                        <Button
                          variant="primary"
                          onClick={() => {
                            addUserToRoom(item._id);
                          }}
                        >
                          <PersonAddIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Typography align="center" variant="h6">
            Members in Room
          </Typography>
          <Grid container>
            <Grid>
              <MovableUserInRoom />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  const TaskPanel = () => {
    return (
      <Grid item md={9} xs={12}>
        <Paper className={classes.paper}>
          <RoomTask />
        </Paper>
      </Grid>
    );
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h1>Room Name</h1>
            <h6>Description</h6>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <DndProvider backend={HTML5Backend}>{membersPanel()}</DndProvider>
        <DndProvider backend={HTML5Backend}>{TaskPanel()}</DndProvider>
      </Grid>
    </>
  );
};

export default EmployerSideRoom;
