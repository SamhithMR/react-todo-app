const mongoose = require('mongoose')
const {MONGODB_URL} = process.env

// connect to database
exports.connect = ()=>{
    mongoose.connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn)=>(console.log(conn.connection.host)))
    .catch((err)=>{console.log(err); process.exit(1)})
}