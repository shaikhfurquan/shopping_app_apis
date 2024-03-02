import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'address is required']
        },
        city: {
            type: String,
            required: [true, 'city name is required']
        },
        country: {
            type: String,
            required: [true, 'country name is required']
        },
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, 'product name is required']
            },
            price: {
                type: Number,
                required: [true, 'product name is required']
            },
            quantity: {
                type: String,
                required: [true, 'quantity is required']

            },
            image: {
                type: String,
                required: [true, 'product image is required']
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: [true , 'product name is required']
            }
        }
    ],
    paymentMethod : {
        type : String,
        enum : ["COD" , "ONLINE"],
        default : 'COD',
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : [true , 'user is Id required']
    },
    paidAt : Date,
    paymentInfo :{
        id : String,
        status : String
    },
    itemPrice :{
        type : Number,
        required : [true , 'Item price is required']
    },
    tax :{
        type : Number,
        required : [true , 'tax price is required']
    },
    shippingCharges :{
        type : Number,
        required : [true , 'shipping Charges is required']
    },
    totalAmount :{
        type : Number,
        required : [true , 'Total amount is required']
    },
    orderStatus :{
        type : String,
        emun : ['processing' , 'Shipping' , 'Deliverd'],
        default : 'processing'
    },
    deliverdAt :Date

}, { timestamps: true })


const OrderModel = mongoose.model('order', orderSchema);

export default OrderModel


// {
//     "shippingInfo": {
//       "address": "123 Main Street",
//       "city": "Example City",
//       "country": "Example Country"
//     },
//     "orderItems": [
//       {
//         "name": "Product 1",
//         "price": 19.99,
//         "quantity": 2,
//         "image": "https://res.cloudinary.com/dmmrlwkys/image/upload/v1709231761/dg7rd27mumxhg7srffem.webp",
//         "product": "65e0605322caba340050ee1c"
//       }
//     ],
    
//     "itemPrice": 2000,
//     "tax": 5,
//     "shippingCharges": 10,
//     "totalAmount": 20015
//   }
  