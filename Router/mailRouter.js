import express from 'express'
import { getMail, sendMails,deleteMail } from '../Controller/sendMail.js'

const mailRoute=express.Router()

mailRoute.post('/createAndSend',sendMails)
mailRoute.get('/getAllMail',getMail)
mailRoute.delete('/deleteMail/:id',deleteMail)


export default mailRoute