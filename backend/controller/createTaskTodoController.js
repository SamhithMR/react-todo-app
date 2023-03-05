import { todomodel } from '../model/todos.js'

const createTaskTodoController = async (req, res) => {
    const { task } = req.body
    const userId = req.user?.id
    const id = req.params.id

    // validations
    if (!task) {
        return res.status(400).json({
            sucess: false,
            message: "task must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // find the todo by id and push a task to task array
    try {
        await todomodel.updateOne({
            _id:id
        }, {$push: {task}})

        res.status(201).json({
            sucess: true,
            message: "a task created"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export default createTaskTodoController