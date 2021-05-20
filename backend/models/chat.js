const mongoose = require("mongoose");

//Basically it only represents chats in room
const chatSchema = mongoose.Schema({
  messages: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: String,
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
