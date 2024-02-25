
import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connect(process.env.MONGO_URL + process.env.DB_NAME).then(() => {
        console.log(`Connected to ==> ${process.env.MONGO_URL}${process.env.DB_NAME} successfully`);
    }).catch((error) => {
        console.log(`Error connecting to db`, error.message);

    })


}

export default connectDB