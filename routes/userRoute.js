import express from 'express';
<<<<<<< Updated upstream
import { loginUser, registerUser } from '../controllers/userController.js';
=======
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
>>>>>>> Stashed changes

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
<<<<<<< Updated upstream

export default userRouter
=======
userRouter.get('/profile', isAuthenticated ,getUserProfile)
userRouter.get('/logout', isAuthenticated ,logoutUser)

export default userRouter
>>>>>>> Stashed changes
