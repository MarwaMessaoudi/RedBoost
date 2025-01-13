const mongoose = require("mongoose");
const Task = require("./TaskSchema");
const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "notStarted",
        "inProgress",
        "completed",
        "cancelled",
        "expired",
        "valid",
      ],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program", // Reference to the Program model
    },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Reference to the Task model
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
