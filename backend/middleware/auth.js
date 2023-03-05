import jwt from 'jsonwebtoken'
import config from '../config/index.js'

const SECRTKEY = config.SECRTKEY

const auth = (req, res, next) => {
    const {token} = req.cookies

    // validations
    if (!token) {
        return res.status(401).json({
           sucess: false,
           message: "unauthorized user"
        })
    }
    // verify the token present in cookie and store it in request object(req.user)
    try {
        const decoded = jwt.verify(token, SECRTKEY)
        req.user = decoded
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
    return next()
}

export default auth