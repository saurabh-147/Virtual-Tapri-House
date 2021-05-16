const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Office = require("../models/office");
const Room = require("../models/room");
const Task = require("../models/task");
const middleware = require("../middleware/userAuth");
const office = require("../models/office");

router.get("/userInfo", middleware, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

router.post("/createOffice", middleware, (req, res) => {
  const { name, description } = req.body;

  const newOffice = new Office({
    name: name,
    description: description,
  });

  newOffice
    .save()
    .then((office) => {
      User.findByIdAndUpdate(req.user._id, { haveOffice: true, haveofficeId: office._id }, { new: true }).then((user) => {
        return res.status(200).json({ success: true, message: "Woooo , Your Office is Created", user });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//send notification to user if he gets offer to join the office
router.get("/getNotificationForOffice", middleware, (req, res) => {
  if (req.user.offerToJoinOffice !== null) {
    Office.findById(req.user.offerToJoinOffice).then((office) => {
      return res.status(200).json({ success: true, isPresent: true, office: { officeId: office._id, name: office.name } });
    });
  } else {
    return res.status(200).json({ success: true, isPresent: true });
  }
});

router.post("/acceptRequestToJoinOffice", middleware, (req, res) => {
  Office.findByIdAndUpdate(req.user.offerToJoinOffice, { $push: { memberInOffice: req.user._id } }).then((office) => {
    User.findById(req.user._id).then((user) => {
      user.underOfficeId = req.user.offerToJoinOffice;
      user.offerToJoinOffice = null;
      user.underOffice = true;

      user
        .save()
        .then((user) => {
          return res.status(200).json({ success: true, message: "You Are Succesfully Added To Office" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

//Not Sure that it is correct
router.get("/getAlltaksOfEmployee/:roomId", middleware, (req, res) => {
  Room.findById(req.params.roomId)
    .populate("tasks")
    .then((room) => {
      const tasksAssingedToUser = room.tasks.filter((t) => {
        return t.isAssigned && t.isAssignedTo.toString() === req.user._id.toString();
      });

      const userRoomDetails = {
        name: room.name,
        description: room.description,
        tasks: tasksAssingedToUser,
      };

      return res.status(200).json({ success: true, room: userRoomDetails });
    });
});

router.post("/setTaskComplete/:taskId", middleware, (req, res) => {
  console.log(req.params.taskId);
  Task.findByIdAndUpdate(req.params.taskId, { $set: { status: true } }, { new: true })
    .then((task, err) => {
      if (err) {
        console.log(err);
      }
      console.log("asnmdan", task);
      res.status(200).json({ success: true, message: "Task is completed" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/userDetailsOfTaskAssigned/:taskId", (req, res) => {
  Task.findById(req.params.taskId)
    .populate("isAssignedTo", "name")
    .then((task) => {
      res.status(200).json({ success: true, tasksAssingedToUser: task.isAssignedTo.name });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
