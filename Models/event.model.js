import Mongoose  from "mongoose";
const eventSchema=Mongoose.Schema({
   title:String,
   start:String,
   end:String,
   url:String
})

export const CalendarEvent=Mongoose.model('CalendarEvent',eventSchema)