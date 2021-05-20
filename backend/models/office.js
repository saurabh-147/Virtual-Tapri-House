const mongoose = require("mongoose");

const officeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  memberInOffice: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    },
  ],
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

module.exports = mongoose.model("Office", officeSchema);
