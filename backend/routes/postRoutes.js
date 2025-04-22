import express from "express";

import {protect} from '../middleware/authMiddleware.js'

import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost
} from '../controllers/postController.js'

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPost);
router.delete('/:id', protect, deletePost);
router.put('/:id', protect, updatePost);

export default router;