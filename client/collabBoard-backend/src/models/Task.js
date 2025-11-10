// src/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a task title'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    required: [true, 'Please provide a status'],
    enum: ['To-Do', 'Doing', 'Done'], // Only allows these three values
    default: 'To-Do',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Task can be unassigned
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
  // Supports your colored dot/card idea
  color: {
    type: String,
    default: '#FFFFFF', // Default white/no color
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);