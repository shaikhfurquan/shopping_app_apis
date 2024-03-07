import { handleCastErrorFunction, handleErrorFunction } from "../helper/handleError.js";
import ProductModel from '../models/productModel.js'
import cloudinary from 'cloudinary';
import { getDataUri } from "../utils/features.js"



export const getAllProducts = async (req, res) => {
    const { keyword , category} = req.query
    try {
        const getAllProducts = await ProductModel.find({
            name : {
                $regex : keyword ? keyword : '',
                $options : "i"
            },
            
        }).populate('category')
        res.status(200).json({
            successs: true,
            message: "Products fetch successfully",
            AllProductsCount: getAllProducts.length,
            AllProducts: getAllProducts,
        })
    } catch (error) {
        handleErrorFunction(res, 500, 'Error while getting all products', error);

    }
}


export const getTopProducts = async (req, res) => {
    try {
        //finding products on the basis of rating
        const products = await ProductModel.find({}).sort({rating : -1}).limit(3)
        if (!products) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            successs: true,
            message: "Top 3 product fetch successfully",
            productsCount: products.length,
            products: products
        })
    } catch (error) {
        handleErrorFunction(res, 500, 'Error while getting top products', error);
    }
}


export const getSingleProduct = async (req, res) => {
    try {
        const getAProduct = await ProductModel.findById(req.params.id)
        if (!getAProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        res.status(200).json({
            successs: true,
            message: "Product fetch successfully",
            getAProduct: getAProduct
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while getting a product', error);

    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, description, stock, category, price } = req.body
        // if(!name || !description || !stock   || !price){
        //     return res.status(404).json({
        //         success : false,
        //         message : "All fields are required"
        //     })
        // }
        if (!req.file) {
            return res.status(404).json({
                success: false,
                messsage: "Please provide product images"
            })
        }
        // working on file/image
        const file = getDataUri(req.file)
        const cloudinary_db = await cloudinary.v2.uploader.upload(file.content)
        const image = {
            public_id: cloudinary_db.public_id,
            url: cloudinary_db.secure_url
        }
        const createProduct = await ProductModel.create({
            name, description, price, stock, category ,images: [image]
        })
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            createProduct: createProduct
        })

    } catch (error) {
        handleErrorFunction(res, 500, 'Error while creating a product', error);
    }
}


export const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product details updated successfully",
            updatedProduct: product
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while updating a product', error);
    }
}


export const updateProductPicture = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        if (!req.file) {
            return res.status(404).json({
                success: false,
                message: 'Product image not found'
            })
        }
        const file = getDataUri(req.file)
        const cloudinary_db = await cloudinary.v2.uploader.upload(file.content)

        const image = {
            public_id: cloudinary_db.public_id,
            url: cloudinary_db.secure_url
        }
        product.images.push(image)
        await product.save()
        res.status(200).json({
            success: true,
            message: 'Product image updated successfully'
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while updating  product picture', error);
    }
}


export const deleteProductPicture = async (req, res) => {
    try {

        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        // finding image Id
        let imageId = req.query.imageId
        console.log(imageId);
        if (!imageId) {
            return res.status(404).json({
                success: false,
                message: 'Product image not found'
            })
        }
        let isExists = -1
        product.images.forEach((item, index) => {
            if (item._id.toString() === imageId.toString()) isExists = index
        });
        if (isExists < 0) {
            return res.status(404).json({
                success: false,
                message: 'Product image not found'
            })
        }
        console.log(isExists);
        await cloudinary.v2.uploader.destroy(product.images[isExists].public_id)
        product.images.splice(isExists, 1)
        await product.save()
        res.status(200).json({
            success: true,
            message: 'Product image deleted successfully'
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while deleting product picture', error);
    }
}


export const deleteProduct = async (req, res) => {
    try {

        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        // finding image and deleting it from cloudinary
        for (let index = 0; index < product.images.length; index++) {
            await cloudinary.v2.uploader.destroy(product.images[index].public_id)
        }
        // deleting from database
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while deleting product picture', error);
    }
}


export const updateProductReview = async (req, res) => {
    try {
        //getting comments and review from user
        const {comment , rating} = req.body
        //finding product
        const product = await ProductModel.findById(req.params.id)
        //checking previous reviews
        const alreadyReview = product.reviews.find( (r) => r.user.toString() === req.user._id.toString())
        if(alreadyReview){
            return res.status(400).json({
                success : false,
                message : "Product already reviewed"
            })
        }

        // if not creating review
        const createReview = {
            name : req.user.name,
            rating : Number(rating),
            comment : comment,
            user : req.user._id
        }
        
        // now we will push createReview to the reviews array
        product.reviews.push(createReview)
        product.numOfReviews = product.reviews.length

        // rating
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc , 0 ) / product.reviews.length

        //save
        await product.save()
        res.status(200).json({
            success: true,
            message: 'Product Review added successfully'
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastErrorFunction(res, 'Invalid Id');
        }
        handleErrorFunction(res, 500, 'Error while updating product review', error);
    }
}


