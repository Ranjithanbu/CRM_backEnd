import  Express  from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from "./Database/dbconnection.js";
import userRouter from "./Router/userRouter.js";
import leadRoute from "./Router/leadRouter.js";
import customerRoute from "./Router/customerRouter.js";
import productRoute from "./Router/productRouter.js";
import newsRoute from "./Router/newsRouter.js";
import eventRoute from "./Router/eventRouter.js";
import mailRoute from "./Router/mailRouter.js";
dotenv.config()
const app=Express();
//allowing access from anywhere
app.use(cors());
//to recognize as json object
app.use(Express.json())
//connecting to db
connectDb()
//allow to acces public folder
app.use(Express.static('public'))

app.use('/api',userRouter)
app.use('/lead',leadRoute)
app.use('/customer',customerRoute)
app.use('/product',productRoute)
app.use('/news',newsRoute)
app.use('/event',eventRoute)
app.use('/mail',mailRoute)
const port=process.env.PORT
//listening port 
app.listen(port,()=>{
    console.log('app is listening on the port ',port);
})