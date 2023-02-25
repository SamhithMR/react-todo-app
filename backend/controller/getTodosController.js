const {todomodel} = require('../model/todos')

exports.gettodoscontroller = async (req, res) => {

    const userId = req.user?.id

    // validations
    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }

    // get all the todos of perticulat user using the userID
    try {
        const todos = await todomodel.find({
            user: userId
        })
        res.status(201).json({
            todos,
            sucess:true
        })
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}