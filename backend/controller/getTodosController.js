import { todomodel } from '../model/todos.js'

const gettodoscontroller = async (req, res) => {

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
        var todos = await todomodel.find({
            user: userId
        })

        if (req.query.search) {
            const searchStr = req.query.search.toLowerCase();
            todos = todos.filter(todo => {
                return todo.title.toLowerCase().includes(searchStr) ||  todo.task.some((title) => title.toLowerCase().includes(searchStr))
            });
          }

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

export default gettodoscontroller