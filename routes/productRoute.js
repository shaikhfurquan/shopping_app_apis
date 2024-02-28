import express from 'express';
import { getAllProducts } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/get-all' , getAllProducts)


export default productRouter