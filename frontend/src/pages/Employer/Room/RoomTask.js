import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

import Grid from "@material-ui/core/Grid";
import RoomModal from "../../../components/Modal/RoomModal";
import { isAuthenticated } from "../../../api/auth";
import { addTasksInRoom, getAllTaskOfRoom } from "../../../api/office";

import { useParams } from "react-router-dom";
import Task from "./Task";

const RoomTask = ({ roomId }) => {
  const { token } = isAuthenticated();

  const [taskModal, setTaskModal] = useState(false);

  const [values, setValues] = useState({
    name: "",
    description: "",
  });

  const [tasksInRoom, setTasksInRoom] = useState([]);
  const [preloadData, setPreloadData] = useState(true);

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
        setTaskModal(false);
        setValues(() => {
          return {
            name: "",
            description: "",
          };
        });
        setPreloadData((prev) => !prev);
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
  }, [preloadData]);

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

      <Grid container spacing={3}>
        {tasksInRoom.map((item, index) => {
          return (
            <Grid key={index} item md={6} xs={12}>
              <Task task={item} isAssigned={item.isAssigned} setPreloadData={setPreloadData} />
            </Grid>
          );
        })}
      </Grid>

      <RoomModal openModal={taskModal} title="Create Room" handleClose={handleClose}>
        {childForm()}
      </RoomModal>
    </>
  );
};

export default RoomTask;
