import {todomodel} from '../model/todos.js'

const createTodoController = async (req, res) => {

    const {title} = req.body
    const userId = req.user?.id

    // validations
    if (!title) {
        return res.status(400).json({
            sucess: false,
            message: "title must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized"
        })
    }

    // creata a todo by taking title of todo and initialize task with empty array, add a userID for user reference
    try {
        await todomodel.create({
            title,
            task: [],
            user: userId
        })

        res.status(201).json({
            sucess: true,
            message: "a todo created"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }

}

export default createTodoController