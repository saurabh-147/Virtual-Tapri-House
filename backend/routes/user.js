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
        console.log(user);
        console.log(office);
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
      console.log(office);
      return res.status(200).json({ success: true, isPresent: true, office: { officeId: office._id, name: office.name } });
    });
  } else {
    return res.status(200).json({ success: true, isPresent: true });
  }
});

router.post("/acceptRequestToJoinOffice", middleware, (req, res) => {
  Office.findByIdAndUpdate(req.user.offerToJoinOffice, { $push: { memberInOffice: req.user._id } }).then((office) => {
    console.log(office);
    User.findById(req.user._id).then((user) => {
      user.underOfficeId = req.user.offerToJoinOffice;
      user.offerToJoinOffice = null;
      user.underOffice = true;

      user
        .save()
        .then((user) => {
          console.log(user);
          return res.status(200).json({ success: true, message: "You Are Succesfully Added To Office" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
});

router.get("/getAllRoomsOfEmployee", middleware, (req, res) => {
  return res.status(200).json({ rooms: req.user.userUnderOfficeRooms });
});

//Get All task assinged to given user in given room Id
//TODO:
//Not Sure that it is correct
router.get("/getAlltaksOfEmployee/:roomId", middleware, (req, res) => {
  console.log(req.user.userUnderOfficeRooms);

  Room.findById(req.params.roomId)
    .populate("tasks")
    .then((room) => {
      console.log(room);
      const tasksAssingedToUser = room.tasks.filter((t) => {
        return t.isAssigned && t.isAssignedTo === req.user._id;
      });
      return res.status(200).json({ tasks: tasksAssingedToUser });
    });
});

module.exports = router;
