const Invite = require("../models/Invite");
const User = require("../models/User");
const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");

// GET all invites for logged-in user
const getInvites = asyncHandler(async (req, res) => {
  const invites = await Invite.find({
    inviteeId: req.user._id,
    status: "pending"
  })
    .populate("ownerId", "name email")
    .populate("boardId", "title");

  res.status(200).json(invites);
});

// ACCEPT invite
const acceptInvite = asyncHandler(async (req, res) => {
  const inviteId = req.params.id;

  const invite = await Invite.findById(inviteId);
  if (!invite) {
    res.status(404);
    throw new Error("Invite not found");
  }

  if (!invite.inviteeId.equals(req.user._id)) {
    res.status(401);
    throw new Error("Not authorized");
  }

  invite.status = "accepted";
  await invite.save();

  // Add board to user
  await User.findByIdAndUpdate(invite.inviteeId, {
    $push: { boards: invite.boardId }
  });

  // Add collaborator to board
  await Board.findByIdAndUpdate(invite.boardId, {
    $push: { collaborators: invite.inviteeId }
  });

  res.status(200).json({ message: "Invite accepted" });
});

// REJECT invite
const rejectInvite = asyncHandler(async (req, res) => {
  const inviteId = req.params.id;

  const invite = await Invite.findById(inviteId);
  if (!invite) {
    res.status(404);
    throw new Error("Invite not found");
  }

  if (!invite.inviteeId.equals(req.user._id)) {
    res.status(401);
    throw new Error("Not authorized");
  }

  invite.status = "rejected";
  await invite.save();

  res.status(200).json({ message: "Invite rejected" });
});

module.exports = {
  getInvites,
  acceptInvite,
  rejectInvite
};
