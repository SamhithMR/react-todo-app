const model = require('../model/todos')

exports.editTodoController = async(req,res) =>{
    try {
        const todo = await model.findOneAndUpdate(
          { _id: req.params.id},
           {title: req.body.title },
          { new: true }
        );
        res.status(201).json({ status: "updated", todo });
      }
    catch(err){
        console.log(err.message);
    }
}