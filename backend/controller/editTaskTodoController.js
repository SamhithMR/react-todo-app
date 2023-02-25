const {todomodel} = require('../model/todos')

exports.editTaskTodoController = async(req,res) =>{
    try {
        const { index, text } = req.body; // get the todo id, index of the task, and the new value from the request body
        const updatedTodo = await todomodel.findOneAndUpdate(
            { _id: req.params.id}, // pass an object with the _id property
            { $set: { [`task.${index}`]: text } }, // update query
            { new: true } // options object to return the updated todo
          );
        res.status(201).json({ status: "updated", todo: updatedTodo });
    }
    catch(err){
        console.log(err.message);
    }
}
