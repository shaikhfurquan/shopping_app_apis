import CategoryModel from "../models/categoryModel.js";


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
            category : createCategory
        })

    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while creating category', error);

    }
}


export const getAllCategories = async (req, res) => {
    try {
        const getAllCategories = await CategoryModel.find()
        if(!getAllCategories){
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
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all products', error);

    }
}


export const getSingleCategory = async (req, res) => {
    try {
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllProductsCount: getAllProducts.length,
            AllProducts: getAllProducts,
        })
    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all products', error);

    }
}


export const updateCategory = async (req, res) => {
    try {
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllProductsCount: getAllProducts.length,
            AllProducts: getAllProducts,
        })
    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all products', error);

    }
}


export const deleteCategory = async (req, res) => {
    try {
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllProductsCount: getAllProducts.length,
            AllProducts: getAllProducts,
        })
    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all products', error);

    }
}



export const getAllProducts = async (req, res) => {
    try {
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllProductsCount: getAllProducts.length,
            AllProducts: getAllProducts,
        })
    } catch (error) {
        handleErrorMiddlewareFunction(res, 500, 'Error while getting all products', error);

    }
}