const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  membersInRoom: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  chatInRoom: {
    type: Boolean,
    default: false,
  },
  roomChatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

module.exports = mongoose.model("Room", roomSchema);
