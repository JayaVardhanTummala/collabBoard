// src/controllers/boardController.js
const asyncHandler = require('express-async-handler');
const Board = require('../models/Board');
const User = require('../models/User'); // Needed for finding users/updating references

// @desc    Create a new Board
// @route   POST /api/boards
// @access  Private
const createBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const ownerId = req.user._id;

  if (!title) {
    res.status(400);
    throw new Error('Board title is required');
  }

  const board = await Board.create({
    title,
    owner: ownerId,
    // Collaborators start empty
  });

  // IMPORTANT: Update the owner's User document to reference this new board
  await User.findByIdAndUpdate(
    ownerId,
    { $push: { boards: board._id } },
    { new: true }
  );

  res.status(201).json(board);
});

// @desc    Get all boards for the logged-in user (owner OR collaborator)
// @route   GET /api/boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find boards where the user is EITHER the owner OR listed in collaborators
  const boards = await Board.find({
    $or: [
      { owner: userId },
      { collaborators: userId }
    ]
  }).sort({ createdAt: -1 }); // Show newest boards first

  res.status(200).json(boards);
});

// @desc    Get a single Board by ID (and populate tasks)
// @route   GET /api/boards/:id
// @access  Private (Must be owner or collaborator)
const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id)
    .populate({
        path: 'tasks',
        options: { sort: { createdAt: 1 } } // Sort tasks in the order they were created
    })
    .populate('owner', 'name email') // Only show name/email of the owner
    .populate('collaborators', 'name email'); // Only show name/email of collaborators

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Authorization check: Ensure the logged-in user is authorized to view this board
  const isOwner = board.owner._id.equals(req.user._id);
  const isCollaborator = board.collaborators.some(collab => collab._id.equals(req.user._id));

  if (!isOwner && !isCollaborator) {
    res.status(403);
    throw new Error('Not authorized to access this board');
  }

  res.status(200).json(board);
});


// @desc    Delete a Board
// @route   DELETE /api/boards/:id
// @access  Private (Owner only)
const deleteBoard = asyncHandler(async (req, res) => {
  const boardId = req.params.id;
  const userId = req.user._id;

  const board = await Board.findById(boardId);

  if (!board) {
    res.status(404);
    throw new Error('Board not found');
  }

  // Only the owner can delete the board
  if (!board.owner.equals(userId)) {
    res.status(401);
    throw new Error('Not authorized to delete this board');
  }

  // 1. Remove task references from the User model for all collaborators/owner
  await User.updateMany(
    { _id: { $in: [board.owner, ...board.collaborators] } },
    { $pull: { boards: boardId } }
  );
  
  // 2. Delete all associated tasks (important cleanup)
  await Task.deleteMany({ board: boardId });

  // 3. Delete the board itself
  await board.deleteOne();

  res.status(200).json({ success: true });
});

// @desc    Invite a user to a Board by email
// @route   PUT /api/boards/:id/invite
// @access  Private (Owner only)
const inviteCollaborator = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const boardId = req.params.id;
    const ownerId = req.user._id;

    if (!email) {
        res.status(400);
        throw new Error('Please provide the email of the user to invite');
    }

    const board = await Board.findById(boardId);

    if (!board) {
        res.status(404);
        throw new Error('Board not found');
    }

    // Authorization: Only the board owner can invite users
    if (!board.owner.equals(ownerId)) {
        res.status(401);
        throw new Error('Only the board owner can invite collaborators');
    }

    // 1. Find the user to be invited
    const invitee = await User.findOne({ email });

    if (!invitee) {
        res.status(404);
        throw new Error(`User with email ${email} not found`);
    }

    // Prevent inviting the owner or an already existing collaborator
    if (board.owner.equals(invitee._id) || board.collaborators.includes(invitee._id)) {
        res.status(400);
        throw new Error('User is already a collaborator or the owner');
    }

    // 2. Add the invitee to the Board's collaborators list
    board.collaborators.push(invitee._id);
    await board.save();

    // 3. Add the Board reference to the invitee's User document
    invitee.boards.push(boardId);
    await invitee.save();

    // 4. Return the updated board data (optional: populate to show new name)
    const updatedBoard = await Board.findById(boardId).populate('collaborators', 'name email');

    res.status(200).json(updatedBoard);
});


module.exports = {
  createBoard,
  getBoards,
  getBoard,
  deleteBoard,
  inviteCollaborator,
};