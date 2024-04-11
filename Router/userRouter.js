import Express from "express";
import { googleAuth, registerUser, uploadImage } from "../Controller/registerUser.js";
import { loginUser, resetPassword, resetAuth, getUser, getAlluser } from "../Controller/loginControl.js";
import { upload } from "../Controller/registerUser.js";
const router = Express.Router()

router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.post('/resetAuth', resetAuth)
router.post('/resetPassword/:token', resetPassword)
router.get('/getuser', getUser)
router.post('/upload/:token', upload.single('file'), uploadImage)
router.get('/getAllUser', getAlluser)
router.post('/googleAuth',googleAuth)



export default router