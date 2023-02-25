const { todomodel } = require('../model/todos')

exports.deleteTaskTodoController = async (req, res) => {
    const { task } = req.body
    const userId = req.user?.id
    const id = req.params.id

    // validations
    if (!task || task === "") {
        return res.status(400).json({
            sucess: false,
            message: "empty task"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // delet a task by considering the id of the todo and remove the elemnt from the array using the value(task) of the element
    try{
        await todomodel.updateOne({
            _id:id
        }, {$pull: {task}})

        res.status(201).json({
            sucess: true,
            message: "a task deleted"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}