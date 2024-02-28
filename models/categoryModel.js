import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category : {
        type : String,
        required : [true, 'Category is required']
    },
    
}, { timestamps: true })


const CategoryModel = mongoose.model('Category', categorySchema);

export default CategoryModel