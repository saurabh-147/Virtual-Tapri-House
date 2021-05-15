const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Office = require("../models/office");
const Room = require("../models/room");
const middleware = require("../middleware/userAuth");

router.post("/addMembersToOffice", middleware, (req, res) => {
  console.log(req.user.haveofficeId);
  const { email } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(422).json({ success: false, error: "User Doesn't Exist" });
      }

      user.offerToJoinOffice = req.user.haveofficeId;

      user
        .save()
        .then((user) => {
          return res.status(200).json({ success: true, message: "Request Succesfully sent to join the office , When he accept the request he will added to your room" });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
});

router.get("/getAllMembersInOffice", middleware, (req, res) => {
  Office.findById(req.user.haveofficeId)
    .populate("memberInOffice", "name email")
    .then((office) => {
      console.log(office);
      return res.status(200).json({ success: true, members: office.memberInOffice });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createRoom", middleware, (req, res) => {
  const { name, description } = req.body;

  const newRoom = new Room({
    name: name,
    description: description,
  });

  newRoom.save().then((room) => {
    console.log(room);

    Office.findByIdAndUpdate(req.user.haveofficeId, { $push: { rooms: room._id } })
      .then((office) => {
        console.log(office);
        return res.status(200).json({ success: true, message: "Room Is Created" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/getAllRoomsInOffice", middleware, (req, res) => {
  Office.findById(req.user.haveofficeId)
    .populate("rooms", "name description")
    .then((office) => {
      console.log(office);
      return res.status(200).json({ success: true, officeRooms: office.rooms });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
