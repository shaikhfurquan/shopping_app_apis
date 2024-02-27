import express from 'express'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', isAuthenticated ,getUserProfile)
userRouter.get('/logout', isAuthenticated ,logoutUser)

export default userRouter
