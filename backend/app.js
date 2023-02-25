require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
const router = require('./router/routs')
var cookieParser = require('cookie-parser')

// middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use("/",router)

module.exports = app
