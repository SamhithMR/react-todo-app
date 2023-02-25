const mongoose = require("mongoose")
const { Schema } = mongoose

// user schema to store users detail
const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// todo schema to store todos along with tasks and user reference
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    task: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

const usermodel = mongoose.model("user", UserSchema)
const todomodel = mongoose.model("todo", TodoSchema)

module.exports = {
    usermodel,
    todomodel
}