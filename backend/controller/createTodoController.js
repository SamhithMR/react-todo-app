const {todomodel} = require('../model/todos')

exports.createTodoController = async(req,res) =>{
    try{const todos = await todomodel.create({
        title: req.body.title,
        task:[]
    })
    res.status(201).json({todos})
}
    catch(err){
        console.log(err.message);
    }
}