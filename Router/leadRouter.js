import  Express  from "express";
import { createLead, deleteLead, editLead, getLeadById, getLeads, myLeads } from "../Controller/leadControl.js";
const leadRoute=Express.Router()

leadRoute.post('/createLead',createLead)
leadRoute.get('/getLeads',getLeads)
leadRoute.delete('/deleteLead/:id',deleteLead)
leadRoute.get('/getLeadById/:id',getLeadById)
leadRoute.put('/editLead/:id',editLead)
leadRoute.get('/myLeads/:userName',myLeads)
export default leadRoute
