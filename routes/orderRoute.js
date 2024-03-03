
import express from 'express';

import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';
import { acceptPayment, createOrder, getAllOrders, getMyOrders, getSingleOrder } from '../controllers/orderController.js';


const orderRouter = express.Router()

orderRouter.post('/create' , isAuthenticated , createOrder)
orderRouter.get('/my-orders' , isAuthenticated , getMyOrders)
orderRouter.get('/my-orders/:id' , isAuthenticated , getSingleOrder)

orderRouter.post('/payments' , isAuthenticated , acceptPayment)


// working on admin section
orderRouter.get('/admin/get-all-orders' , isAuthenticated , isAdmin , getAllOrders)

export default orderRouter