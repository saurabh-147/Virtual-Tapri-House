import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import RoomModal from "../../components/Modal/RoomModal";
import { isAuthenticated } from "../../api/auth";
import { addTasksInRoom, getAllTaskOfRoom } from "../../api/office";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    // whiteSpace: "nowrap",
    marginBottom: theme.spacing(3),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
  },
}));

const RoomTask = () => {
  const classes = useStyles();
  const { token } = isAuthenticated();
  const { roomId } = useParams();
  const [taskModal, setTaskModal] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [tasksInRoom, setTasksInRoom] = useState([]);

  const handleClose = () => {
    setTaskModal(false);
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
            <Form.Label>Task Name</Form.Label>
            <Form.Control type="text" value={values.name} name="name" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={values.description} name="description" onChange={handleChange} />
          </Form.Group>
        </Form>
        <Button
          variant="primary"
          onClick={() => {
            addTaskToRoom();
          }}
        >
          Add Task
        </Button>
      </>
    );
  };

  const addTaskToRoom = () => {
    addTasksInRoom(token, roomId, values).then((data) => {
      if (data.success) {
        alert(data.message);
        setTaskModal(false);
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
    getAllTaskOfRoom(token, roomId).then((data) => {
      if (data.success) {
        setTasksInRoom(data.room.tasks);
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
            setTaskModal(true);
          }}
        >
          Add Task
        </Button>
      </Form>
      <DragDropContext>
        <Droppable droppableId="characters">
          {(provided, snapshot) => (
            <Grid container spacing={3} innerRef={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
              {tasksInRoom.map((item, index) => {
                return (
                  <Grid key={index} item md={6} xs={12}>
                    <Paper className={classes.paper}>
                      <Typography align="center" variant="h5">
                        {item.name}
                      </Typography>
                      <br />
                      {item.description}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <RoomModal openModal={taskModal} title="Create Room" handleClose={handleClose}>
        {childForm()}
      </RoomModal>
    </>
  );
};

export default RoomTask;
