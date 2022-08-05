const express = require("express");

const router = express.Router();
const {
  winningTeam,
  losingTeam
} = require("../controllers/resultController");

const { protect } = require("../middleware/authMiddleware");

router.route("/winner").put(protect, winningTeam)
router.route("/loser").put(protect, losingTeam);

module.exports = router;
