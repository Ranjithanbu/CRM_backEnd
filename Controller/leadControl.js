import { Mongoose } from "mongoose";
import { Lead } from "../Models/lead.model.js";
import { User } from "../Models/userModel.js";

// creating new lead 

export const createLead = async (req, res) => {
    try {
        const {
            assign,
            city,
            comment,
            country,
            email,
            intrest,
            name,
            phone,
            source,
            state,
            street,
            website,
            zipcode

        } = req.body

        const addLead = new Lead({
            assign:assign.toLowerCase(),
            city,
            comment,
            country,
            email,
            intrest,
            name,
            phone,
            source,
            state,
            street,
            website,
            zipcode
        })
        await addLead.save()
        res.status(200).json({ message: 'Lead added successfully', data: addLead })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//send all leads to frontend

export const getLeads = async (req, res) => {
    try {
        const allLead = await Lead.find()
        res.status(200).json({ message: 'leads fetched successfully', data: allLead })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

//removing leads from db

export const deleteLead = async (req, res) => {
    try {
        const id = req.params.id
        const deletedLead = await Lead.findByIdAndDelete(id)
        res.status(200).json({ message: "deleted successfully", data: deleteLead })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//getting leads by id

export const getLeadById = async (req, res) => {
    try {
        const id = req.params.id
        const findedData = await Lead.findById(id).select('-_id -__v')
        res.status(200).json({ message: 'fetching details success', data: findedData })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//editing existed lead

export const editLead = async (req, res) => {
    try {

        const id = req.params.id
        const {
            assign,
            city,
            comment,
            country,
            email,
            intrest,
            name,
            phone,
            source,
            state,
            street,
            website,
            zipcode

        } = req.body

        const editedLead = await Lead.findByIdAndUpdate(id, {
            assign,
            city,
            comment,
            country,
            email,
            intrest,
            name,
            phone,
            source,
            state,
            street,
            website,
            zipcode

        })

        res.status(200).json({ message: 'lead Updated successfully', data: editedLead })
    } catch (error) {


        res.status(500).json({ message: error.message })
    }
} 


//sending leads to frontend based on the username

export const myLeads=async(req,res)=>{
    try {

     const userName=req.params.userName
const userData=await Lead.aggregate([
{$match :{
    assign:`${userName}`
}}
   ])
res.status(200).json({message:'leads fetched successfully',data:userData})
    } catch (error) {
      res.status(500).json({message:error.message})  

    }
} 
