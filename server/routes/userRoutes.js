import express from 'express'
import {registerUser, loginUser, getCurrentUser} from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/dashboard', protect, getCurrentUser)

export default router
