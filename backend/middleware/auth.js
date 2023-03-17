import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const SECRTKEY = config.SECRTKEY

const auth = (req, res, next) => {
    let token;
    if (
        req.cookies.token 
        || (req.headers?.authorization)
        ) {
        token = req.cookies.token 
        || req.headers.authorization
    }
    
    if (!token) {
        return res.status(401).json({
            sucess: false,
            message: 'invalid token'
        })
    }

    // verify the token present in cookie and store it in request object(req.user)
    try {
        const decoded = jwt.verify(token, SECRTKEY)
        req.user = decoded
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
    return next()
}

export default auth