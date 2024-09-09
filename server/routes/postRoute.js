import express from 'express'
import { getFeed, getUserPosts, likePost } from '../controllers/postController.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ROUTES
router.get('/', verifyToken, getFeed);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;