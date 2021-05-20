import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { addMembersToRoom, getAllMembersInOffice, membersInRoom } from "../../../api/office";
import { isAuthenticated } from "../../../api/auth";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as TiIcons from "react-icons/ti";
import RoomTask from "./RoomTask";
import UserInRoom from "./UserInRoom";

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
  const [preloadRoomData, setPreloadRoomData] = useState(true);
  const preload1 = () => {
    getAllMembersInOffice(token).then((data) => {
      console.log(data);
      if (data.success) {
        setMembers(data.members);
      } else {
        alert(data.error);
      }
    });
  };
  const preload2 = () => {
    membersInRoom(token, roomId).then((data) => {
      if (data.success) {
        setRoomMembers(data.membersInRoom);

        var leftMembers = members.filter((val) => {
          let flag = 0;

          data.membersInRoom.map((item) => {
            if (item._id === val._id) flag = 1;
          });

          if (flag === 0) return val;
        });
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

  useLayoutEffect(() => {
    if (members.length !== 0 && roomMembers.length === 0) {
      preload2();
    }
  }, [members, preloadRoomData]);

  const addUserToRoom = (userId) => {
    addMembersToRoom(token, roomId, userId).then((data) => {
      console.log(data);
      if (data.success) {
        setPreloadRoomData((prev) => !prev);
        alert(data.message);
      } else {
        alert(data.error);
      }
    });
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
                        {item.userId.name}
                        <br />
                        {item.userId.email}
                      </Grid>
                      <Grid item>
                        <Button
                          variant="primary"
                          onClick={() => {
                            addUserToRoom(item.userId._id);
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
              {roomMembers.map((item, index) => (
                <UserInRoom key={index} roomMember={item} />
              ))}
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
          <RoomTask roomId={roomId} />
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
        <DndProvider backend={HTML5Backend}>
          {membersPanel()}
          {TaskPanel()}
        </DndProvider>
      </Grid>
    </>
  );
};

export default EmployerSideRoom;
