const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    isAssigned: {
      type: Boolean,
      default: false,
    },
    isAssignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "InComplete",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
