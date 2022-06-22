const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

// desc Register a new user
// Route /api/users
// Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !email || !password || !lastName) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

// desc Login a user
// Route /api/users/login
// Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  }else {
      res.status(401);
      throw new Error("Invalid email or password");
  }
});

// desc getMe
// Route /api/users/me
// Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
      id: req.user._id,
      email: req.user.email,
    };
  res.status(200).json(user)
});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
