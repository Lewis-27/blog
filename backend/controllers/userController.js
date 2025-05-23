import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @ desc       Auth user/set token
// router       POST /api/users/auth
// @ access     Public
const authUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if(user && (await user.matchPassword(password))) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      colour: user.colour
    })
  } else {
    res.status(401);
    throw new Error('Invalid email of password');
  }
})

// @ desc       Register a new user
// router       POST /api/users
// @ access     Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password, colour} = req.body;
  const userExists = await User.findOne({email})

  if(userExists){
    res.status(400);
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    colour
  })

  if(user) {
    generateToken(res,user._id)
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      colour: user.colour
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
})

// @ desc       Logout user
// router       POST /api/users/logout
// @ access     Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({
    message: 'User logged out'
  })
})

// @ desc       Get user profile
// router       GET /api/users/profile
// @ access     Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    colour: req.user.colour
  }

  res.status(200).json({
    user
  })
})

// @ desc       Update user profile
// router       PUT /api/users/profile
// @ access     Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if(user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.colour = req.body.colour || user.colour;
    if(req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      colour: updatedUser.colour
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})

// @ desc       Update user profile
// router       PUT /api/users/profile
// @ access     Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user){
    res.status(200).json({
      name: user.name,
      colour: user.colour
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
})

// @ desc       Get all users
// router       /api/users
// @ access     Public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({},'-password');
  if(users){
    res.status(200).json(users)
  } else {
    res.status(404);
    throw new Error('Error fetching users')
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  getAllUsers
};