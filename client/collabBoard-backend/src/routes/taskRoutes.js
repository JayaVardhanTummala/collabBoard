// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    createTask, 
    updateTask, 
    deleteTask 
} = require('../controllers/taskController');

// All task creation is done via POST to the base /api/tasks route
router.route('/')
    .post(protect, createTask);

// Routes for specific tasks (update and delete)
router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, deleteTask);

module.exports = router;