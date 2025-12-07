import express from 'express'
import {createPost, getAllPosts, deletePost} from '../controllers/postControllers.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createPost)
router.get('/', getAllPosts)
router.delete('/:postId', protect, deletePost)

export default router