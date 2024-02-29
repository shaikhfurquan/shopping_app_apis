import express from 'express';
import { createProduct, getAllProducts, getSingleProduct, updateProduct, updateProductPicture } from '../controllers/productController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';


const productRouter = express.Router();

productRouter.get('/get-all' , getAllProducts)
productRouter.get('/get/:id' , getSingleProduct)
productRouter.post('/create' , isAuthenticated , singleUpload , createProduct)
productRouter.put('/update/:id' , isAuthenticated  , updateProduct)
productRouter.put('/update/pic/:id' , isAuthenticated , singleUpload  , updateProductPicture)


export default productRouter