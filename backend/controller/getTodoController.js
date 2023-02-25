const {todomodel } = require('../model/todos')

exports.gettodocontroller = async (req, res) => {

    const userId = req.user?.id
    const id = req.params.id

    // validations
    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // find the todo by its id
    try {
        const todo = await todomodel.findById(id)
        res.status(201).json({
            todo,
            sucess:true
        })
    }
    catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}