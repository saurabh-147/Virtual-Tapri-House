const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Office = require("../models/office");
const Room = require("../models/room");
const Task = require("../models/task");
const middleware = require("../middleware/userAuth");

router.post("/addMembersToRoom/:roomId", middleware, (req, res) => {
  const roomId = req.params.roomId;
  const userId = req.body.userId;

  Room.findByIdAndUpdate(roomId, { $addToSet: { membersInRoom: userId } }, { new: true })
    .then((room) => {
      User.findById(userId)
        .then((user) => {
          const userRooms = user.userUnderOfficeRooms.filter((u) => {
            return u.roomId.toString() != room._id.toString();
          });

          userRooms.push({ name: room.name, description: room.description, roomId: room._id });

          user.userUnderOfficeRooms = userRooms;
          user
            .save()
            .then((u) => {
              return res.status(200).json({ success: true, message: "user added", user: u });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getAllMembersOfRoom/:roomId", middleware, (req, res) => {
  const roomId = req.params.roomId;
  Room.findById(roomId)
    .populate("membersInRoom", "name email")
    .then((room) => {
      return res.status(200).json({
        success: true,
        membersInRoom: room.membersInRoom,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addTasks/:roomId", middleware, (req, res) => {
  const { name, description } = req.body;

  let newTask = new Task({
    name: name,
    description: description,
  });
  newTask
    .save()
    .then((task) => {
      Room.findByIdAndUpdate(req.params.roomId, { $push: { tasks: task._id } }).then((room) => {
        return res.status(200).json({ success: true, message: "Task is succesfully added To Room" });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/displayAlltasks/:roomId", middleware, (req, res) => {
  Room.findById(req.params.roomId)
    .populate("tasks")
    .then((room) => {
      return res.status(200).json({ success: true, room: room });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/assignTask/:taskId", middleware, (req, res) => {
  const { userId } = req.body;

  Task.findById(req.params.taskId)
    .then((task) => {
      if (task.isAssigned === false) {
        task.isAssigned = true;
        task.isAssignedTo = userId;
        task.save().then((task) => {
          return res.status(200).json({ success: true, message: "Task assigned to user" });
        });
      } else {
        return res.status(200).json({ success: false, message: "Task is already assigned" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
