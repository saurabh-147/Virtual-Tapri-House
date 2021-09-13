const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Office = require("../models/office");
const Room = require("../models/room");
const middleware = require("../middleware/userAuth");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "saurabhgpta147@gmail.com", // generated ethereal user
    pass: "Sgupta@061999", // generated ethereal password
  },
});

router.get("/officeDetailsForEmployee", middleware, (req, res) => {
  Office.findById(req.user.underOfficeId)
    .then((data) => {
      return res.status(200).json({ success: true, officeDetails: data });
    })
    .catch((err) => {
      console.log(er);
    });
});

router.get("/officeDetailsForEmployer", middleware, (req, res) => {
  Office.findById(req.user.haveofficeId)
    .then((data) => {
      return res.status(200).json({ success: true, officeDetails: data });
    })
    .catch((err) => {
      console.log(er);
    });
});

router.post("/addMembersToOffice", middleware, (req, res) => {
  const { email } = req.body;

  User.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        let info = await transporter.sendMail({
          from: "saurabhgpta147@gmail.com", // sender address
          to: email, // list of receivers
          subject: `Lets Meet`, // Subject line
          text: "Join the Office", // plain text body
          html: `<div><b>Please Register the Application And Wait for Request to Join the Office</b> <a href = http://localhost:3000/signup>Join Office</a></div>`, // html body
        });

        return res.status(422).json({ success: false, error: "User Doesn't Exist , An Mail has been sent to the User to Register the Application and Join the Office" });
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
    .populate("memberInOffice.userId", "name email")
    .then((office) => {
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
    Office.findByIdAndUpdate(req.user.haveofficeId, { $push: { rooms: room._id } })
      .then((office) => {
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
      return res.status(200).json({ success: true, officeRooms: office.rooms });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
