
const {usermodel} = require('../model/todos')
const bcrypt = require('bcryptjs')

exports.register = async(req,res) =>{
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10)

        const resp = await usermodel.create({
            email:req.body.email,
            password: newPassword
        })
        res.status(201).json({"status":"created","resp":resp})
    }
    catch(err){
        res.status(401).json({"status":err})
    }
}