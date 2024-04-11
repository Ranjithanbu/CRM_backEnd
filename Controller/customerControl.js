import { Customer } from "../Models/customer.model.js"

//storing new customer into database

export const createCustomer = async (req, res) => {
    try {
        const { city,
            country,
            email,
            name,
            phone,
            state,
            street,
            website,
            zipcode } = req.body

        const saveCustomer = await new Customer({
            city,
            country,
            email,
            name,
            phone,
            state,
            street,
            website,
            zipcode
        })

        await saveCustomer.save()

        res.status(200).json({ message: "customer Added successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

//fetching from db and send to frontend

export const getCustomers = async (req, res) => {
    try {

        const customerData = await Customer.find().select(' -__v')
        res.status(200).json({ message: "details fetched successfully", data: customerData })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//removing customer from database

export const deleteCustomer = async (req, res) => {
    try {
        const id = req.params.id

        const deletedCustomer = await Customer.findByIdAndDelete(id)
        res.status(200).json({ message: 'deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//searching customer by id and passing  to frontend 

export const getCustomerById = async (req, res) => {
    try {
        const id = req.params.id

        const getCustomer = await Customer.findById(id).select('-_id -__v')
        res.status(200).json({ message: 'customer fetched successfully', data: getCustomer })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//make changes already existing customer 

export const Editcustomer = async (req, res) => {
    try {
        const id = req.params.id
        const { city,
            country,
            email,
            name,
            phone,
            state,
            street,
            website,
            zipcode } = req.body
        const updatedData = await Customer.findByIdAndUpdate(id, {
            city,
            country,
            email,
            name,
            phone,
            state,
            street,
            website,
            zipcode
        })
        res.status(200).json({ message: 'updated successfully', data: updatedData })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}    