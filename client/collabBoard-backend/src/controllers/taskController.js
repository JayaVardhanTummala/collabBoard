// src/controllers/taskController.js
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const Board = require('../models/Board');

// Utility function to check if user can access board
const checkBoardAccess = (board, userId) => {
    const isOwner = board.owner.equals(userId);
    const isCollaborator = board.collaborators.some(collab => collab.equals(userId));
    return isOwner || isCollaborator;
};


// @desc    Create a new Task on a Board
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const { boardId, title, description, status, assignedTo, color } = req.body;
    const userId = req.user._id;

    if (!boardId || !title) {
        res.status(400);
        throw new Error('Board ID and Task title are required');
    }

    const board = await Board.findById(boardId);

    if (!board) {
        res.status(404);
        throw new Error('Board not found');
    }
    
    // Check authorization
    if (!checkBoardAccess(board, userId)) {
        res.status(403);
        throw new Error('Not authorized to add tasks to this board');
    }

    // 1. Create the Task
    const task = await Task.create({
        board: boardId,
        title,
        description,
        status, // Defaults to 'To-Do' if not provided
        assignedTo,
        color
    });

    // 2. Add the Task ID reference to the Board document
    board.tasks.push(task._id);
    await board.save();

    res.status(201).json(task);
});

// @desc    Update a Task (title, description, status, assignedTo, color)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const { title, description, status, assignedTo, color } = req.body;
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findById(taskId);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    
    const board = await Board.findById(task.board);
    
    // Check authorization via parent board
    if (!checkBoardAccess(board, userId)) {
        res.status(403);
        throw new Error('Not authorized to modify this task');
    }

    // Apply updates
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description; // Allow clearing description
    task.status = status || task.status;
    task.assignedTo = assignedTo !== undefined ? assignedTo : task.assignedTo;
    task.color = color || task.color;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
});

// @desc    Delete a Task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    const task = await Task.findById(taskId);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    const board = await Board.findById(task.board);
    
    // Check authorization via parent board
    if (!checkBoardAccess(board, userId)) {
        res.status(403);
        throw new Error('Not authorized to delete this task');
    }
    
    // 1. Remove the task ID from the Board's task list (Cleanup)
    board.tasks.pull(taskId);
    await board.save();
    
    // 2. Delete the Task document
    await task.deleteOne();

    res.status(200).json({ success: true, message: 'Task removed successfully' });
});

module.exports = {
    createTask,
    updateTask,
    deleteTask
};