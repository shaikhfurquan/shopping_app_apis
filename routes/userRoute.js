import express from 'express'
import { rateLimit } from 'express-rate-limit'
import { getUserProfile, loginUser, logoutUser, registerUser, resetUserPassword, updateProfilePicture, updateUserPassword, updateUserProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

const userRouter = express.Router();

userRouter.post('/register', limiter ,registerUser)
userRouter.post('/login', limiter ,loginUser)
userRouter.get('/profile', isAuthenticated ,getUserProfile)
userRouter.get('/logout', isAuthenticated ,logoutUser)
userRouter.put('/update-profile', isAuthenticated , updateUserProfile)
userRouter.put('/update-password', isAuthenticated , updateUserPassword)
userRouter.post('/reset-password', resetUserPassword)

userRouter.put('/update-picture', isAuthenticated ,  singleUpload , updateProfilePicture)

export default userRouter
