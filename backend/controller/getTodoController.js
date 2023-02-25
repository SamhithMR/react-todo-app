const {todomodel } = require('../model/todos')

exports.gettodocontroller = async(req,res) =>{
    try{const todo = await todomodel.findById(req.params.id)
    res.status(201).json({todo})
}
    catch(err){
        console.log(err.message);
    }
}