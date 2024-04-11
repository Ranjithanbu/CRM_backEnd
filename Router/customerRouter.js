import Express from "express";
import { Editcustomer, createCustomer, deleteCustomer, getCustomerById, getCustomers } from "../Controller/customerControl.js";
const customerRoute = Express.Router()

customerRoute.post('/createCustomer', createCustomer)
customerRoute.get('/getCustomers', getCustomers)
customerRoute.delete('/deleteCustomer/:id', deleteCustomer)
customerRoute.get('/getCustomerById/:id', getCustomerById)
customerRoute.put('/editCustomer/:id', Editcustomer)

export default customerRoute