const mongoose = require("mongoose");

//Basically it only represents chats in room
const chatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      textMessage: String,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
