const model = require('../model/todos')

exports.deleteTaskTodoController = async (req, res) => {

    if(req.body.task !== ""){
        const data = { $pull: {task: req.body.task}};
        const todo = await model.updateOne({ _id: req.params.id}, data)
        res.status(201).json({todo})
    }
    else{
        res.status(401).json({"error":"empty array is not accepter"})
    }

}