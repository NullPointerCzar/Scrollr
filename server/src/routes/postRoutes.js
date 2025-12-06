import express from 'express'
import {createPost, getAllPosts} from '../controllers/postControllers.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, createPost)
router.get('/', getAllPosts)

export default router