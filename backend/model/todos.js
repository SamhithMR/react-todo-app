const mongoose =require("mongoose")
const {Schema} = mongoose

const TodoSchema = new Schema({
    title: String,
    task:[String]
})

module.exports = mongoose.model("todo",TodoSchema)