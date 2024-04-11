import Express from "express";
import { createProduct, deleteProduct, editProduct, getProduct, getProductById } from "../Controller/productControl.js";
const productRoute = Express.Router()

productRoute.post('/createProduct', createProduct)
productRoute.get('/getAllProduct', getProduct)
productRoute.delete('/deleteProduct/:id', deleteProduct)
productRoute.get('/getProductById/:id', getProductById)
productRoute.put('/editProduct/:id', editProduct)








export default productRoute