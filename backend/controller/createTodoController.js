const model = require('../model/todos')

exports.createTodoController = async(req,res) =>{
    try{const todos = await model.create({
        title: req.body.title,
        task:[]
    })
    res.status(201).json({todos})
}
    catch(err){
        console.log(err.message);
    }
}