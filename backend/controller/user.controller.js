import express from 'express';
import { todomodel } from '../model/todos.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { usermodel } from '../model/todos.js'
import config from '../config/index.js'
const {SECRTKEY} = config

export const home = (req, res) => {
    res.send({"status":"hello this is get request router"})
}

// todo routers
export const getTodo = async (req, res) => {

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
export const getTodos =  async (req, res) => {

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
export const deletTodo = async (req, res) => {
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
export const addTodo = async (req, res) => {

    const {title} = req.body
    const userId = req.user?.id

    // validations
    if (!title) {
        return res.status(400).json({
            sucess: false,
            message: "title must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized"
        })
    }

    // creata a todo by taking title of todo and initialize task with empty array, add a userID for user reference
    try {
        await todomodel.create({
            title,
            task: [],
            user: userId
        })

        res.status(201).json({
            sucess: true,
            message: "a todo created"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }

}
export const editTodo = async (req, res) => {

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

// task routers
export const createTask = async (req, res) => {
    const { task } = req.body
    const userId = req.user?.id
    const id = req.params.id

    // validations
    if (!task) {
        return res.status(400).json({
            sucess: false,
            message: "task must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // find the todo by id and push a task to task array
    try {
        await todomodel.updateOne({
            _id:id
        }, {$push: {task}})

        res.status(201).json({
            sucess: true,
            message: "a task created"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export const deleteTask = async (req, res) => {
    const { task } = req.body
    const userId = req.user?.id
    const id = req.params.id

    // validations
    if (!task || task === "") {
        return res.status(400).json({
            sucess: false,
            message: "empty task"
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

    // delet a task by considering the id of the todo and remove the elemnt from the array using the value(task) of the element
    try{
        await todomodel.updateOne({
            _id:id
        }, {$pull: {task}})

        res.status(201).json({
            sucess: true,
            message: "a task deleted"
        })
    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export const editTask = async (req, res) => {

    let { index, text } = req.body;
    const userId = req.user?.id
    const id = req.params.id

    index = String(index)

    // validations
    if (!text) {
        return res.status(400).json({
            sucess: false,
            message: "text feild must not be empty"
        })
    }

    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }
    if (!index) {
        return res.status(401).json({
            sucess: false,
            message: "invalid index"
        })
    }

    if(!id){
        return res.status(400).json({
            sucess: false,
            message: "invalid todos id"
        })
    }

    // find the todo by its id, by using the index of the element edit the task
    try {
       await todomodel.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    [`task.${index}`]: text
                }
            }, 
            {
                new: true
            } 
        );
        res.status(201).json({
            sucess: true,
            message: "edited task"
        })
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}

// users routers
export const register  = async(req,res) =>{
    const {email,password} = req.body
    // validations
    if (!email) {
        return res.status(401).json({
            sucess: false,
            message: "email is required"
        })
    }
    if (!password) {
        return res.status(401).json({
            sucess: false,
            message: "password is required"
        })
    }
    // encrypt the password using bcrypt and store it in database
    try{
        const newPassword = await bcrypt.hash(password, 10)
        await usermodel.create({
            email,
            password: newPassword
        })
        res.status(201).json({
            sucess: true,
            message: "user registered sucessfully"
        })
    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export const login = async(req,res) =>{
    try{
        const {email,password} = req.body
        const SECRTKEY = config.SECRTKEY
        const user = await usermodel.findOne({email})

// validations
        if(!email){
            return res.status(400).json({
                sucess:false,
                message:"email is required"
            })
        }
        if(!password){
            return res.status(400).json({
                sucess:false,
                message:"password is required"
            })
        }

        // check if the password is matching the old password uisng bcrypt compare method
        if(user && await bcrypt.compare(password, user.password)){
            const token = jwt.sign({id:user._id}, SECRTKEY ,{expiresIn:'2h'})

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token",token, options).json({
                 success: true, 
                 message: 'Cookie and header set successfully.',
                 token });

        }
        else{
            res.status(401).json({
                sucess:false,
                message:"invalid password"
            })
        }

    }catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}
export const logout = async (req, res) => {

    // clear the token value 
    try {
      res.clearCookie("token") // clear the token cookie
      res.status(200).json({
        sucess: true,
        message: "Logged out successfully"
      })
      try {
        localStorage.clear(); //if in case there are any data stored in local storage, clear all the data present
      } catch {}
      
    } catch (err) {
      res.status(400).json({
        sucess: false,
        message: err.message
      })
    }
}
export const getuser = async(req, res) => {
    let token;
    if (
        req.cookies.token 
        || (req.headers?.authorization)
        ) {
        token = req.cookies.token 
        || req.headers.authorization
    }
    
    if (!token) {
        return res.status(401).json({
            sucess: false,
            message: 'invalid token'
        })
    }

    // verify the token present in cookie and store it in request object(req.user)
    try {
        const decoded = jwt.verify(token, SECRTKEY)
        if(decoded.id){
            const resp = await usermodel.findOne({_id: decoded.id})
            if(!resp){return res.status(404).json({message:"user not found"})}
            return res.status(200).json({
                sucess:true,
                email:resp.email,
                message:'authorized'
            })
        }
        else{
            return res.status(401).json({
                sucess: false,
                message: 'invalid user user'
            })
        }
    }catch (err) {
        return res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}