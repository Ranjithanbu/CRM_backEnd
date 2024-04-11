import mongoose, { mongo } from "mongoose";


const productSchema=new mongoose.Schema({
    ProductName:String,
    category:String,
    image:String,
    rate:String,
    stock:String,
    description:String

})


export const Product=mongoose.model('Product',productSchema)