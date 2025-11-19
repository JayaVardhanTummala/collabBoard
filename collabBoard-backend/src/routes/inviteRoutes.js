const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getInvites,
  acceptInvite,
  rejectInvite
} = require("../controllers/inviteController");

router.get("/", protect, getInvites);
router.put("/:id/accept", protect, acceptInvite);
router.put("/:id/reject", protect, rejectInvite);

module.exports = router;
