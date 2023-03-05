import { todomodel } from '../model/todos.js'

const deleteTodoController = async (req, res) => {
    const id = req.params.id
    const userId = req.user?.id

    // validations
    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid id"
        })
    }
    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized"
        })
    }

    // find the todo by its id and delet it
    try {
        await todomodel.findByIdAndDelete(id)
        res.status(201).json({
            sucess: true,
            message: "a todo deleted"
        })
    } 
    catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export default deleteTodoController