import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connectDB.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
dotenv.config()

const app = express();

 

//express middlewares 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
app.use(cookieParser());



//routes
app.use('/api/users' , userRouter)

//DB Connection
connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`Server listening on port ${process.env.PORT}`);
})


