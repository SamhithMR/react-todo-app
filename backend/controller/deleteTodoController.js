const model = require('../model/todos')

exports.deleteTodoController = async(req,res) =>{
    try{const todos = await model.findByIdAndDelete(req.params.id)
    res.status(201).json({"status":"deleted"})
}
    catch(err){
        console.log(err.message);
    }
}