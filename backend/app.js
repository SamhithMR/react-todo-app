require('dotenv').config()
require('./config/database').connect()

const express = require('express')
const app = express()
const router = require('./router/routs')
var cookieParser = require('cookie-parser')
const cors = require('cors');

// middlewares
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use("/",router)

module.exports = app
