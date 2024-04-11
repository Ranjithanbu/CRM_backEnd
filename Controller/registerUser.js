import { User } from "../Models/userModel.js"
import bcryptjs from 'bcryptjs'
import multer from "multer"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//recieving new user and store to db 

export const registerUser = async (req, res) => {

  const { userName, email, password } = req.body
  if (!userName || !email || !password || userName === '' || email === '' || password === '') {
    return res.status(200).json({ message: "All fields are equired" })
  }
  const checkExistance = await User.findOne({ userName })

  if (checkExistance) {
    return res.status(200).json({ message: 'username already exist', data: checkExistance })
  }
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const RegisteredUser = await new User({ userName, email, password: hashedPassword })

    await RegisteredUser.save()
    res.status(200).json({ message: 'Signup successful', success: true })
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname)
  }

})
export const upload = multer({
  storage
})

//uploading profile image for existing user

export const uploadImage = async (req, res) => {
  try {
    const token = req.params.token
    const decodedId = jwt.verify(token, process.env.JWT_KEY)
    const resData = await User.findByIdAndUpdate(decodedId._id, { image: req.file.filename }).select('-_id -password')
    const newData = await User.findById(decodedId)
    res.status(200).json({ message: 'Image uploaded succcessfully', data: newData.image })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


//google authorization

export const googleAuth=async(req,res)=>{
  try {
 const{userName,email}=req.body   
const findInDb=await User.findOne({email}).select('-password')

if(findInDb){
const token=jwt.sign({_id:findInDb._id},process.env.JWT_KEY)
res.status(200).cookie('token',token,{
            httpOnly:true,
            sameSite:'none',
            expires:new Date(Date.now()+24*60*60*1000),
            secure:true

}).json({message:"signIn successfull",data:findInDb})
}
else{
const newPassword=Math.random().toString(36).slice(2).toLowerCase()
const hashedPassword=bcryptjs.hashSync(newPassword,10)
const endchar=email.indexOf('@')
const name=email.slice(0,endchar)
const userData=new User({
  userName:name,
  email,
  password:hashedPassword
})

const savedData=await userData.save()
const{password,...rest}=savedData
const token=await jwt.sign({_id:savedData._id},process.env.JWT_KEY)
res.status(200).cookie('token',token,{
  httpOnly:true,
            sameSite:'none',
            expires:new Date(Date.now()+24*60*60*1000),
            secure:true

}).json({message:'signIn success',data:rest})
}

  } catch (error) {
    
console.log(error);
    res.status(500).json({message:error.messsage})
  }
}