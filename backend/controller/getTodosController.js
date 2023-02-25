const {todomodel} = require('../model/todos')

exports.gettodoscontroller = async(req,res) =>{
    try{const todos = await todomodel.find()
    res.status(201).json({todos})
}
    catch(err){
        console.log(err.message);
    }
}