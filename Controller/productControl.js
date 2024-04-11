import { Product } from "../Models/product.model.js"

//creating new product

export const createProduct = async (req, res) => {
    try {

        const {
            ProductName,
            category,
            image,
            rate,
            stock,
            description
        } = req.body
        const newProduct = await new Product({
            ProductName,
            category,
            image,
            rate,
            stock,
            description
        })
        await newProduct.save()
        res.status(200).json({ message: "Product Added successfully" })
    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

//get all products

export const getProduct = async (req, res) => {
    try {

        const getAllproduct = await Product.find()
        res.status(200).json({ message: "fetched successfully", data: getAllproduct })

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

//delete  products using id

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id

        const deletedCustomer = await Product.findByIdAndDelete(id)
        res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//product get by id

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id

        const getPro = await Product.findById(id).select('-_id -__v')
        res.status(200).json({ message: 'Product fetched successfully', data: getPro })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }


}

//editing product details

export const editProduct = async (req, res) => {
    try {
        const id = req.params.id
        const { ProductName,
            category,
            image,
            rate,
            stock } = req.body
        const updatedData = await Customer.findByIdAndUpdate(id, {
            ProductName,
            category,
            image,
            rate,
            stock
        })
        res.status(200).json({ message: 'updated successfully', data: updatedData })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}