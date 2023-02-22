const model = require('../model/todos')

exports.deleteTaskTodoController = async (req, res) => {
    const data = {
        $pull: {
            task: req.body.task
        }
    };

    try {
        const todo = await model.updateOne({_id: req.params.id}, data)

        res.status(201).json({
            todo
        })
    } catch (err) {
        console.log(err.message);
    }
}