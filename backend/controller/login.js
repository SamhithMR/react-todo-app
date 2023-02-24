const {usermodel} = require('../model/todos')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

exports.login = async(req,res) =>{
    try{
        const resp = await usermodel.findOne({
            email:req.body.email
        })

        if(resp && await bcrypt.compare(req.body.password, resp.password)){
            const token = jwt.sign({id:resp._id},"todoapp",{expiresIn:'2h'})

            const options = {
                expiresIn: new Date((Date.now() + 3*24*60*60*1000)),
                httpOnly:true
            }
            res.status(201).cookie("token",token, options).json({
                token,
                sucess:true
            })
        }
        else{
            res.status(401).json({"status":"not fine"})
        }
    }

    catch(err){
        res.status(401).json({"status":err})
    }
}