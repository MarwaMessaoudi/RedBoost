const mongoose = require('mongoose');

const TaskTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kpis: [{ type: mongoose.Schema.Types.ObjectId, ref: 'kpi' }],
});

module.exports = mongoose.model('TaskType', TaskTypeSchema);
