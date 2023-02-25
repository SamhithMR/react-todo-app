const {todomodel} = require('../model/todos')

exports.editTodoController = async (req, res) => {

  const { title } = req.body;
  const userId = req.user?.id
  const id = req.params.id

//   validations

  if (!title) {
      return res.status(400).json({
          sucess: false,
          message: "title must not be empty"
      })
  }

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

//   find the todo by its id and edit the title fo the todo
  try {
    await todomodel.findOneAndUpdate(
      {_id: id}, {title}, {new: true}
      );
      
      res.status(201).json({
        sucess: true,
        message: "edited todo"
    })
  }catch (err) {
    res.status(400).json({
        sucess: false,
        message: err.message
    })
}
}