import mongoose from 'mongoose';

const mailSchema=mongoose.Schema({

sender:{
    type:String
},
reciever:{
    type:String
},
subject:{
    type:String
},
text:{
    type:String

},
creater:{
    type:String
}

})

export const MailDB=mongoose.model('MailDB',mailSchema)