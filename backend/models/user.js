const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  haveOffice: {
    type: Boolean,
    default: false,
  },
  haveofficeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
  },
  underOffice: {
    type: Boolean,
    default: false,
  },
  underOfficeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
  },
  userChatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  offerToJoinOffice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
  },
  userUnderOfficeRooms: [
    {
      roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
      name: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
