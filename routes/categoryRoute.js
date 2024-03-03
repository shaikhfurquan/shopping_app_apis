
import express from 'express';
import { createCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from '../controllers/categoryController.js';
import { isAdmin, isAuthenticated } from '../middlewares/authMiddleware.js';


const categoryRouter = express.Router()

categoryRouter.get('/get-all' , getAllCategories)
categoryRouter.get('/get/:id' , getSingleCategory)
categoryRouter.post('/create' , isAuthenticated , isAdmin , createCategory)
categoryRouter.delete('/delete/:id' , isAuthenticated , isAdmin , deleteCategory)
categoryRouter.put('/update/:id' , isAuthenticated , isAdmin , updateCategory)

export default categoryRouter