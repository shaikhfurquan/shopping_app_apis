import express from 'express'
import { getUserProfile, loginUser, logoutUser, registerUser, updateUserPassword, updateUserProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', isAuthenticated ,getUserProfile)
userRouter.get('/logout', isAuthenticated ,logoutUser)
userRouter.put('/update-profile', isAuthenticated , updateUserProfile)
userRouter.put('/update-password', isAuthenticated , updateUserPassword)

export default userRouter
