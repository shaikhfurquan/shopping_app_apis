import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import productRouter from './routes/productRoute.js';

dotenv.config()
const app = express();

//DB Connection
connectDB()
 
//cloudinary configur
cloudinary.v2.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
})



//express middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(cookieParser());



//routes
app.use('/api/users' , userRouter)
app.use('/api/products' , productRouter)




app.listen(process.env.PORT , ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})


