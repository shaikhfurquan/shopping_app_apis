
import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';


const categoryRouter = express.Router()

categoryRouter.get('/get-all' , getAllCategories)
categoryRouter.post('/create' , isAuthenticated , createCategory)

export default categoryRouter