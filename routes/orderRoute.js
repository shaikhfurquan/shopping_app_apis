
import express from 'express';

import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { createOrder, getMyOrders, getSingleOrder } from '../controllers/orderController.js';


const orderRouter = express.Router()

orderRouter.post('/create' , isAuthenticated , createOrder)
orderRouter.get('/my-orders' , isAuthenticated , getMyOrders)
orderRouter.get('/my-orders/:id' , isAuthenticated , getSingleOrder)

export default orderRouter