import config from './config/index.js'
import {connect} from './config/database.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './router/routs.js'

connect();

const app = express()
// middlewares
app.use(cors({origin: config.FRONTEND || `http://localhost:${config.PORT}`,credentials:true}));
app.use(cookieParser(undefined, {
  sameSite: 'none',
  secure: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/",router)

export default app
