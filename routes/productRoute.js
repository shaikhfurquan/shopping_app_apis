import express from 'express';
import { createProduct, deleteProduct, deleteProductPicture, getAllProducts, getSingleProduct, updateProduct, updateProductPicture } from '../controllers/productController.js';
import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';


const productRouter = express.Router();

productRouter.get('/get-all' , getAllProducts)
productRouter.get('/get/:id' , getSingleProduct)
productRouter.post('/create' , isAuthenticated , isAdmin,  singleUpload , createProduct)
productRouter.put('/update/:id' , isAuthenticated  , updateProduct)
productRouter.put('/update/pic/:id' , isAuthenticated , isAdmin,  singleUpload  , updateProductPicture)
productRouter.delete('/delete/pic/:id', isAuthenticated , isAdmin,  deleteProductPicture)
productRouter.delete('/delete/:id', isAuthenticated , isAdmin,  deleteProduct)


export default productRouter