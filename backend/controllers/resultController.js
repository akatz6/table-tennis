const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");

// desc Update winning players record
// Route Post /api/result
// Private
const winningTeam = asyncHandler(async (req, res) => {
  req.body.forEach((element) => {
    element.wins += 1;
    element.lastPlayed = Date.now();
    element.percentage = (element.wins / (element.wins + element.loses)) * 1000;
  });
  let player = await Player.findById(req.body[0]._id);
  if (player) {
    await player.update(req.body[0]);
  }
  if (req.body.length === 2) {
    player = await Player.findById(req.body[1]._id);
    if (player) {
      await player.update(req.body[1]);
    }
  }
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc Update losing players record
// Route Post /api/result
// Private
const losingTeam = asyncHandler(async (req, res) => {
    req.body.forEach((element) => {
      element.loses += 1;
      element.lastPlayed = Date.now();
      element.percentage =
        (element.wins / (element.wins + element.loses)) * 1000;
    });
    let player = await Player.findById(req.body[0]._id);
    if (player) {
      await player.update(req.body[0]);
    }
    if (req.body.length === 2) {
      player = await Player.findById(req.body[1]._id);
      if (player) {
        await player.update(req.body[1]);
      }
    }
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
});

module.exports = {
  winningTeam,
  losingTeam,
};
