const asyncHandler = require("express-async-handler");
const Player = require("../models/playerModel");
const { truncate } = require("fs");
const path = require("path");

// desc Create a new player
// Route Post /api/player
// Private
const createPlayer = asyncHandler(async (req, res) => {
  if (!req?.files?.image) {
    res.status(400);
    throw new Error("Please include image");
  }
  const image = req.files.image;
  const path = "backend/images/" + image.name;

  image.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
  const { firstName, lastName, email } = JSON.parse(req.body.userData);
   if (!firstName || !lastName || !email) {
     res.status(400);
     throw new Error("Please fill out all the information");
   }
  // Find if user exists
  const playerExists = await Player.findOne({ email });
  if (playerExists) {
    res.status(400);
    throw new Error("Player already exists");
  }

  // Create Player
  const player = await Player.create({
    firstName,
    lastName,
    email,
    wins: 0,
    loses: 0,
    image: path,
    percentage: 0,
    lastPlayed: null,
  });
  if (player) {
    res.status(201).json({
      _id: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      email: player.email,
      image: player.image,
      wins: player.wins,
      loses: player.loses,
      percentage: player.percentage,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc get all players
// Route Get /api/player
// Private
const getPlayers = asyncHandler(async (req, res) => {
  const player = await Player.find();
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc get a player
// Route Get /api/player/:id
// Private
const getPlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player) {
    res.status(200).json(player);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc del a player
// Route Delete /api/player/:id
// Private
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  console.log(player);
  if (player) {
    await Player.remove();
    res.status(200).json({ message: "success" });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc update a player
// Route Put /api/player/:id
// Private
const updatePlayer = asyncHandler(async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (player) {
    const playerUpdate = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(playerUpdate);
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

module.exports = {
  createPlayer,
  getPlayers,
  getPlayer,
  deletePlayer,
  updatePlayer,
};
