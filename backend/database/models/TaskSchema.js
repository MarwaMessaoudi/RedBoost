const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const kpiSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
});

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  commenter: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const taskSchema = new mongoose.Schema({
  taskName: {
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
  xpPoints: {
    type: Number,
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
  taskOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resources: {
    type: [fileSchema],
    default: [],
  },
  deliverables: {
    type: [fileSchema],

    default: [],
  },
  kpis: {
    type: [kpiSchema],

    default: [],
  },
  reports: {
    type: [kpiSchema],

    default: [],
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
});

module.exports = mongoose.model("Task", taskSchema);
