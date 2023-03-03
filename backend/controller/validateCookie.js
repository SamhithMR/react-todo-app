const jwt = require('jsonwebtoken')
const {SECRTKEY} = process.env
const { usermodel } = require('../model/todos')

exports.validateCookie = async(req, res) => {
    // validations
    if(!req.cookies){
        return res.status(401).json({
            sucess: false,
            message: 'cookies not found'
        })
    }
    
    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({
           sucess: false,
           message: "token not found"
        })
    }

    // verify the token present in cookie and store it in request object(req.user)
    try {
        const decoded = jwt.verify(token, SECRTKEY)
        if(decoded.id){
            const resp = await usermodel.findOne({_id: decoded.id})
            if(!resp){return res.status(404).json({message:"user not found"})}
            return res.status(200).json({
                sucess:true,
                email:resp.email,
                message:'authorized'
            })
        }
        else{
            return res.status(401).json({
                sucess: false,
                message: 'invalid user user'
            })
        }
    }catch (err) {
        return res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
