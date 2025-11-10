// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true, // Standardize email storage
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  // This will store ObjectIds from the Board model
  boards: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Board',
    default: [],
  },
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// --- Password Hashing Middleware ---
// Runs BEFORE the user document is saved
UserSchema.pre('save', async function (next) {
  // Only run this function if the password was actually changed/created
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Password Comparison Method ---
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);