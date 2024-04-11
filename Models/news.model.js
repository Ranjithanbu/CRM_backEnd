import  mongoose  from "mongoose";

const newsSchema=new mongoose.Schema({
    subject:String,
    description:String,
    forTo:String,
    creater:String
})


export const News=mongoose.model('News',newsSchema)