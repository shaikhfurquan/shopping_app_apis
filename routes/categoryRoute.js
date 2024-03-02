
import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from '../controllers/categoryController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';


const categoryRouter = express.Router()

categoryRouter.get('/get-all' , getAllCategories)
categoryRouter.get('/get/:id' , getSingleCategory)
categoryRouter.post('/create' , isAuthenticated , createCategory)
categoryRouter.delete('/delete/:id' , isAuthenticated , deleteCategory)
categoryRouter.put('/update/:id' , isAuthenticated , updateCategory)

export default categoryRouter