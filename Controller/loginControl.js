import { User } from "../Models/userModel.js"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { transport } from "../nodemailer.js"

dotenv.config()

//checking user in db whether existed or not  and send response to frontend 

export const loginUser = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(200).json({
            message: 'All fields are required'
        })
    }

    try {
        const findInDb = await User.findOne({ userName })


        if (!findInDb) {
            return res.status(501).json({ message: 'user not found' })
        }
        const comparePassword = bcryptjs.compareSync(password, findInDb.password)
        if (!comparePassword) {
            return res.status(501).json({ message: "invalid credintials" })
        }
        const token = jwt.sign({ _id: findInDb._id }, process.env.JWT_KEY, { expiresIn: "1h" })
         

        const neededData = {
            userName: findInDb.userName,
            email: findInDb.email,
            image: findInDb.image,
            role: findInDb.role,
            token: token,

        }
        res.status(200).cookie('token',token,{
            httpOnly:true,
            sameSite:'none',
            expires:new Date(Date.now()+24*60*60*1000),
            secure:true
        })
.json({
            message: 'login successful', data: neededData
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error.message);
    }
}


//reset password link generation

export const resetAuth = async (req, res) => {
    const { email } = req.body
    try {
        const checkEmail = await User.findOne({ email })
        if (!checkEmail) {
            return res.status(401).json({ message: 'email not found' })
        }
        const validToken = jwt.sign({ _id: checkEmail._id }, process.env.JWT_KEY, { expiresIn: '5m' })
        const mailOption = {
            from: process.env.emailId,
            to: checkEmail.email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetPassword/${checkEmail._id}/${validToken}`
        }
        if (checkEmail) {
            const info = await transport.sendMail(mailOption, (err) => {
                if (err) { console.log(err) }
                else { console.log('mail sended successfully'); }

            })
            return res.status(200).json({ message: 'mail sended successfully', token: validToken })
        }

    } catch (error) {
        res.status(500).json({ message: error })
    }

}



//upadating new password 

export const resetPassword = async (req, res) => {
    try {
        const token = req.params.token

        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        const findDb = await User.findById(decoded._id)
        console.log(findDb)
        if (!findDb) {
            return res.status(401).json({ message: 'un authorized token ' })
        }

        const { password } = req.body
        const hashpassword = await bcryptjs.hashSync(password, 10)
        const upadateData = await User.findByIdAndUpdate(decoded._id, { password: hashpassword })

        res.status(200).json({ message: 'password updated successfully', data: 'success' })
    } catch (error) {
        res.status(401).json({ message: 'reset password failed' });
    }


}

//sending user to frontend

export const getUser = async (req, res) => {
    try {
        const token = req.header('Authorization')
        console.log(token)
        const decode = jwt.verify(token, process.env.JWT_KEY)
        if (!decode) {
            res.status(401).json({ message: 'cannot get profile' })
        }
        const verifyDd = await User.findById(decode._id).select('-password -_id -__v')

        res.status(200).json({
            message: 'user details fetched successfully', data: verifyDd
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//sending all user to frontend

export const getAlluser = async (req, res) => {
    try {

        const data = await User.find().select('-_v -password')
        res.status(200).json({ message: 'fetched successfully', data: data })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}