const mongoose =require("mongoose")
const {Schema} = mongoose

const UserSchema = new Schema({
    email: String,
    password: String
});

const TodoSchema = new Schema({
    title: String,
    task: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const usermodel = mongoose.model("user", UserSchema)
const todomodel = mongoose.model("todo",TodoSchema)

module.exports = {usermodel, todomodel}