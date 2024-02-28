import { handleErrorMiddleware } from "../middlewares/handleError.js";
import ProductModel from '../models/productModel.js'


export const getAllProducts = async (req, res) =>{
    try {
        const getAllProducts = await ProductModel.findById()
        res.status(200).json({
            successs : true,
            message : "Product fetch successfully",
            AllProducts : getAllProducts
        })
    } catch (error) {
        handleErrorMiddleware(res, 500, 'Error while getting all products', error);
      
    }
}