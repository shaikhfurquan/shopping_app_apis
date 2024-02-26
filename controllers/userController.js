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
        if(!isMatch) {
            res.status(500).json({
                success: false,
                message : "Invalid Credentials",
            })
        }

        res.status(201).json({
            success: true,
            message: `Welcome ${user.name}`,
            user: user

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message
        })
    }
}