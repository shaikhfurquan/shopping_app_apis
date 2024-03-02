import CategoryModel from "../models/categoryModel.js";
import { handleCastErrorMiddlewareFunction, handleErrorMiddlewareFunction } from "../middlewares/handleError.js";
import ProductModel from '../models/productModel.js'




export const createCategory = async (req, res) => {
    try {
        const { category } = req.body
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Please provide category name"
            })
        }
        const createCategory = await CategoryModel.create({ category })

        res.status(200).json({
            successs: true,
            message: "Category Created  successfully",
            category: createCategory
        })

    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while creating category', error);

    }
}


export const getAllCategories = async (req, res) => {
    try {
        const getAllCategories = await CategoryModel.find()
        if (!getAllCategories) {
            return res.status(404).json({
                successs: false,
                message: "Category not found"
            })
        }
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllCategoriesCount: getAllCategories.length,
            AllCategories: getAllCategories,
        })
    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all category', error);

    }
}


export const getSingleCategory = async (req, res) => {
    try {
        const getSingleCategory = await CategoryModel.findById(req.params.id)
        if (!getSingleCategory) {
            return res.status(404).json({
                successs: false,
                message: "Category not found"
            })
        }

        res.status(200).json({
            successs: true,
            message: "Category fetch successfully",
            getSingleCategory: getSingleCategory
        })
    } catch (error) {
        if (error.name === 'CastError') {
          return handleCastErrorMiddlewareFunction(res, 'Invalid Id');
        }
        handleErrorMiddlewareFunction(res, 500, 'Error while getting single category', error);

    }
}


export const updateCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({
                success : false,
                messsage : "Category not found",
            })
        }
        const {updatedCategory} = req.body
        // if we found the category Id, associated with product also, finding product with this category Id
        const products = await ProductModel.find({category : category._id})

        for (let i = 0;  i< products.length; i++) {
            const product = products[i]
            product.category = updatedCategory
            await product.save()
        }
        if(updatedCategory){
            category.category = updatedCategory
        }

        await category.save({category : updatedCategory})
        res.status(200).json({
            successs: true,
            message: "Category updated successfully",
            updatedCategory : category
        })
        
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorMiddlewareFunction(res, 'Invalid Id');
        }
        handleErrorMiddlewareFunction(res, 500, 'Error while updating category', error);

    }
}


export const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id)
        if(!category){
            res.status(404).json({
                successs: false,
                message: "Category not found"
            })
        }
        // if we found the category Id, associated with product also, finding product with this category Id
        const products = await ProductModel.find({category : category._id})
        for (let i = 0;  i< products.length; i++) {
            const product = products[i]
            product.category = undefined
            await product.save()
        }
        await category.deleteOne()
        res.status(200).json({
            successs: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorMiddlewareFunction(res, 'Invalid Id');
        }
        handleErrorMiddlewareFunction(res, 500, 'Error while deleting category', error);

    }
}



