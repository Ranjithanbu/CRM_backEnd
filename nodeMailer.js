import nodemailer from 'nodemailer'
import dotenv, { config } from 'dotenv'
dotenv.config()


export const transport=nodemailer.createTransport({

service:'gmail',
auth:{
    user:process.env.emailId,
    pass:process.env.emailPass
}

})