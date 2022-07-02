const express = require("express");

const router = express.Router();
const {
  createPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
} = require("../controllers/playerController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getPlayers).post(protect, createPlayer);

router
  .route("/:id")
  .get(protect, getPlayer)
  .delete(protect, deletePlayer)
  .put(protect, updatePlayer);

module.exports = router;
