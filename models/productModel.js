import mongoose from "mongoose";

//review schema
const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    rating: {
        type: Number,
        default: 0
    },
    comment : {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    }
}, { timestamps: true });

//product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    stock: {
        type: String,
        required: [true, 'Product stock is required'],
    },
    // quantity : {
    //     type : String,
    //     required : [true, 'Product quantity is required'],
    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel