const { todomodel } = require('../model/todos')

exports.editTaskTodoController = async (req, res) => {

    let { index, text } = req.body;
    const userId = req.user?.id
    const id = req.params.id

    index = String(index)

    // validations
    if (!text) {
        return res.status(400).json({
            sucess: false,
            message: "text feild must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }
    if (!index) {
        return res.status(401).json({
            sucess: false,
            message: "invalid index"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // find the todo by its id, by using the index of the element edit the task
    try {
       await todomodel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    [`task.${index}`]: text
                }
            }, 
            {
                new: true
            } 
        );
        res.status(201).json({
            sucess: true,
            message: "edited task"
        })
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}