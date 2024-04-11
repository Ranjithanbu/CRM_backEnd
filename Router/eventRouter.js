import express from 'express'
import { createEvent, deleteEvent, getEvent } from '../Controller/eventControl.js'

const eventRoute=express.Router()

eventRoute.post('/createEvent',createEvent)
eventRoute.get('/getEvent',getEvent)
eventRoute.delete('/deleteAll',deleteEvent)
export default eventRoute;