const {usermodel} = require('../model/todos')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const {SECRTKEY} = process.env
        const user = await usermodel.findOne({email})

// validations
        if(!email){
            return res.status(400).json({
                sucess:false,
                message:"email is required"
            })
        }
        if(!password){
            return res.status(400).json({
                sucess:false,
                message:"password is required"
            })
        }

        // check if the password is matching the old password uisng bcrypt compare method
        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({id:user._id}, SECRTKEY ,{expiresIn:'2h'})

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            
            // store the userID as token in cookie
            res.status(201).cookie("token",token, options).json({
                sucess:true,
                token,
                message:"loggedin sucessfully"
            })
        }
        else{
            res.status(401).json({
                sucess:false,
                message:"invalid password"
            })
        }

    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}