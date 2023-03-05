import { usermodel } from '../model/todos.js'
import bcrypt from 'bcryptjs'

const register = async(req,res) =>{
    const {email,password} = req.body
    // validations
    if (!email) {
        return res.status(401).json({
            sucess: false,
            message: "email is required"
        })
    }
    if (!password) {
        return res.status(401).json({
            sucess: false,
            message: "password is required"
        })
    }
    // encrypt the password using bcrypt and store it in database
    try{
        const newPassword = await bcrypt.hash(password, 10)
        await usermodel.create({
            email,
            password: newPassword
        })
        res.status(201).json({
            sucess: true,
            message: "user registered sucessfully"
        })
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}

export default register