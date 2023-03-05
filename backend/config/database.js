import mongoose from 'mongoose'
import config from './index.js'

const connect = ()=>{
    mongoose.connect(config.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn)=>(console.log(conn.connection.host)))
    .catch((err)=>{console.log(err); process.exit(1)})
}

export {connect}