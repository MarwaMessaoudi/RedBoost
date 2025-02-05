const mongoose = require('mongoose');

// Define file schema
const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: false,
  },
  fileUrl: {
    type: String,
    required: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define comment schema
const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: false,
  },
  commenter: {
    type: String,
    required: false,
  },
  comment: {
    type: String,
    required: false,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

// Define task schema
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
    default: 0,
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
  },
  color: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    required: true,
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskType",
    required: true, // Mark it as required
  },
  kpis: [
    {
      kpiId: { type: mongoose.Schema.Types.ObjectId, ref: 'kpi' },
      count: { type: Number, default: 0 },
      _id: false, // Disable the _id field for each KPI subdocument

    },
  ],
  resources: {
    type: [fileSchema], // Use fileSchema here
    default: [],
  },
  deliverables: {
    type: [fileSchema], // Use fileSchema here
    default: [],
  },

  reports: [
    {
      title: { type: String, required: true }, // Report title
      content: { type: String, required: true }, // Report content
      _id: false, // Disable the _id field for each report subdocument
    },
  ],
 
  comments: {
    type: [commentSchema],
    default: [],
  },




  
});
// Virtual to calculate the status based on dates
taskSchema.virtual('calculateStatus').get(function () {
  const currentDate = new Date();
  if (this.status === 'completed' || this.status === 'cancelled') return this.status;

  if (this.endDate < currentDate) return 'expired';
  if (this.startDate > currentDate) return 'notStarted';
  if (this.startDate <= currentDate && this.endDate >= currentDate) return 'inProgress';
  return 'valid';
});

taskSchema.pre('save', function (next) {
  this.status = this.calculateStatus; // Update status before saving
  next();
});

module.exports = mongoose.model("Task", taskSchema);
