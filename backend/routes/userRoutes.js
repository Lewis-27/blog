import express from "express";

import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUser,
  getAllUsers
} from '../controllers/userController.js'

import {protect} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.get('/:id', getUser);
router.get('/', getAllUsers)

export default router;