import express from "express";

import {protect} from '../middleware/authMiddleware.js'

import {
  createPost,
  getAllPosts,
  getRecentPosts,
  getPost,
  getUserPosts,
  deletePost,
  updatePost
} from '../controllers/postController.js'

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.get('/recent', getRecentPosts);
router.get('/:id', getPost);
router.get('/user/:id', getUserPosts);
router.delete('/:id', protect, deletePost);
router.put('/:id', protect, updatePost);

export default router;