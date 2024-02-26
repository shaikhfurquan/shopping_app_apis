import JWT from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

export const isAuthenticated = async (req, res, next) => {
    try {
        //getting token from req.cookie on the basis of this token we will get the current user
        const { token } = req.cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthenticated User"
            })
        }
        
        //if we found a token then we will decode/verify it
        const decodedUserData = JWT.verify(token, process.env.JWT_SECRET)
        // console.log("decodedUserData==>" , decodedUserData);
        
        //after this process we will get a user in req.user
        req.user = await UserModel.findById(decodedUserData._id)
        // console.log("user",req.user);
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while authenticating",
            error: error.message,
            decodedUserData
        })
    }
}