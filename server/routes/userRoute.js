import express from 'express'
import { getUser, getFriends, manageFriend } from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ROUTES
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getFriends);
router.patch('/:id/:friendId', verifyToken, manageFriend);

export default router;