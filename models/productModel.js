import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Product name is required']
    },
    description : {
        type : String,
        required : [true, 'Product description is required']
    },
    price : {
        type : Number,
        required : [true, 'Product price is required']
    },
    stock : {
        type : String,
        required : [true, 'Product stock is required'],
    },
    // quantity : {
    //     type : String,
    //     required : [true, 'Product quantity is required'],
    // },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category' 
    },
    images : [
        {
            public_id : String,
            url : String
        }
    ]

}, { timestamps: true })


const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel