import mongoose from 'mongoose'



const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        Enumerator:['admin','user'],
        default:'user'
    },

    image:{
        type:String,
        default:'1712599280803_62-512.webp'
        
    }
})



export const User=mongoose.model('User',userSchema)