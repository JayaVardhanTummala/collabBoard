// src/routes/boardRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    createBoard, 
    getBoards, 
    getBoard, 
    deleteBoard,
    inviteCollaborator
} = require('../controllers/boardController');

// Base routes for managing board identity
router.route('/')
    .post(protect, createBoard) // Create Board (requires auth)
    .get(protect, getBoards);   // Get all user's boards (requires auth)

// Routes requiring a specific board ID
router.route('/:id')
    .get(protect, getBoard)      // Get single board details + tasks
    .delete(protect, deleteBoard); // Delete board (Owner only)

// new ROUTE for collabs
router.route('/:id/invite')
    .put(protect, inviteCollaborator); // Endpoint: PUT /api/boards/:id/invite


module.exports = router;