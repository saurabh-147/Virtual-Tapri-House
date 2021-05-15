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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
