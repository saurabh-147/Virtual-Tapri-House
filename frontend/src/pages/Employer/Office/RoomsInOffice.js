import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import * as TiIcons from "react-icons/ti";
import RoomModal from "../../../components/Modal/RoomModal";
import { AddroomToOffice, getAllRoomsInOffice } from "../../../api/office";
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

const RoomsInOffice = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();
  const [roomModal, setRoomModal] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [roomsInOffice, setRoomsInOffice] = useState([]);

  const handleClose = () => {
    setRoomModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const childForm = () => {
    return (
      <>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Office Name</Form.Label>
            <Form.Control type="text" value={values.name} name="name" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={values.description} name="description" onChange={handleChange} />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            roomAddToOffice();
          }}
        >
          Add Room {values.name}
        </Button>
      </>
    );
  };

  const roomAddToOffice = () => {
    AddroomToOffice(values, token).then((data) => {
      if (data.success) {
        alert(data.message);
        setRoomModal(false);
        setValues(() => {
          return {
            name: "",
            description: "",
          };
        });
      } else {
        console.log(data.error);
      }
    });
  };

  const preload = () => {
    getAllRoomsInOffice(token).then((data) => {
      if (data.success) {
        setRoomsInOffice(data.officeRooms);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <Form style={{ textAlign: "center" }}>
        <Button
          variant="primary"
          style={{ marginBottom: "20px" }}
          onClick={() => {
            setRoomModal(true);
          }}
        >
          Add Rooms
        </Button>
      </Form>
      <Grid container>
        <Grid item xs>
          {roomsInOffice.map((item) => {
            return (
              <Paper className={classes.paper}>
                <TiIcons.TiUser />
                &nbsp; {item.name}
                <br />
                &nbsp; &nbsp; &nbsp; {item.description}
                <br />
                <br />
                <Button variant="primary" as={Link} to={`/employerRoom/${item._id}`}>
                  Open Room
                </Button>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
      <RoomModal openModal={roomModal} title="Create Room" handleClose={handleClose}>
        {childForm()}
      </RoomModal>
    </>
  );
};

export default RoomsInOffice;
