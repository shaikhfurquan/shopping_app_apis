import CategoryModel from "../models/categoryModel.js";
import { handleCastErrorMiddlewareFunction, handleErrorMiddlewareFunction } from "../middlewares/handleError.js";
import ProductModel from '../models/productModel.js'
import OrderModel from "../models/orderModel.js";


export const createOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmount, orderStatus } = req.body


        // if (!shippingInfo || !paymentInfo || !orderItems || !paymentMethod || !itemPrice || !tax || !shippingCharges || !totalAmount || !orderStatus) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Please provide all fields"
        //     })
        // }
        const createOrder = await OrderModel.create({
            user: req.user._id,
            shippingInfo, orderItems, paymentMethod, paymentInfo, itemPrice, tax, shippingCharges, totalAmount, orderStatus
        })

        // stock update
        for(let i = 0; i < orderItems.length; i++) {
            // finding product updating the stock(by minus)
            const product = await ProductModel.findById(orderItems[i].product)
            product.stock -= orderItems[i].quantity
            await product.save()
        }
        res.status(200).json({
            successs: true,
            message: "Order placed successfully",
            Order: createOrder
        })

    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while placing Order', error);

    }
}


export const getMyOrders = async (req, res) => {
    try {
        //finding orders on the basis of userId
        const orders = await OrderModel.find({user : req.user._id})

        if(!orders){
            return res.status(404).json({
                successs : false,
                messagee : "No order found"
            })
        }

        res.status(200).json({
            successs: true,
            message: "Your orders fetch successfully",
            totalOrder : orders.length,
            orders : orders
        })

    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting your Order', error);

    }
}


export const getSingleOrder = async (req, res) => {
    try {
        //finding orders on the basis of userId
        const order = await OrderModel.findById(req.params.id)

        if(!order){
            return res.status(404).json({
                successs : false,
                messagee : "No order found with this Id"
            })
        }

        res.status(200).json({
            successs: true,
            message: "Your order fetch successfully",
            order : order
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorMiddlewareFunction(res, 'Invalid Id');
        }
        handleErrorMiddlewareFunction(res, 500, 'Error while getting your Order', error);

    }
}





