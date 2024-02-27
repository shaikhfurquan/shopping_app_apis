
import { generateToken } from "../helper/generateToken.js"
import UserModel from "../models/userModel.js"

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, address, city, country, phone } = req.body
        if (!name || !email || !password || !address || !city || !country || !phone) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",

            })
        }

        //checking if the user is already exists or not
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: "User already exists, please login"
            })
        }
        const newUser = await UserModel.create({ name, email, password, address, city, country, phone })

        res.status(201).json({
            success: true,
            message: "User registered successfully, Please Login",
            user: newUser

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while registering user",
            error: error.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",

            })
        }

        //checking if the user is already exists or not
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found, register first",
            })
        }
        //check password/compare password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(500).json({
                success: false,
                message: "Invalid Credentials",
            })
        }

        const token = await generateToken(user)
        res.status(201).cookie("token", token, {
            expires: new Date(Date.now() + 60 * 60 * 1000),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
        }).json({
            success: true,
            message: `Welcome ${user.name}`,
            user: user,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        })
    }

}


export const getUserProfile = async(req , res) =>{
    try {
        //along with the token user will be created inside the req(req.user)
        const loginUser = await UserModel.findById(req.user._id).select("-password")
        res.status(200).json({
            success: true,
            message : 'User profile',
            userPofile : loginUser

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting user profile",
            error: error.message
        })
    }
}



export const logoutUser = async(req , res) => {
    try {
        
        res.status(200).cookie("token" , "" , {
            expires: new Date(Date.now()),
            secure: process.env.NODE_ENV === "development" ? true : false,
            httpOnly: process.env.NODE_ENV === "development" ? true : false,
        }).json({
            success: true,
            message: "User logged-Out successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logout user",
            error: error.message
        })
    }
}