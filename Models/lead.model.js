import mongoose from "mongoose";

const leadSchema=new mongoose.Schema({
    
    name:String,
    email:String,
    phone:String,
    city:String,
    country:String,
    intrest:String,
    assign:String,
    source:String,
    comment:String,
    state:String,
    street:String,
    website:String,
    zipcode:String
})

export const Lead=mongoose.model('Lead',leadSchema)