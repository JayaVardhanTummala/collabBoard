// src/models/Board.js
const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a board title'],
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  // We'll manage task linking in the controller logic, but reference them here.
  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Task',
    default: [],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Board', BoardSchema);