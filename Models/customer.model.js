import mongoose from "mongoose";


const customerSchema=mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    city:String,
    country:String,
    state:String,
    street:String,
    website:String,
    zipcode:String


})

export const Customer=mongoose.model('Customer',customerSchema)