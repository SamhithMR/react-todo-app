const express = require('express')

const {home} = require('../controller/home')
const {createTodoController} = require('../controller/createTodoController')
const {deleteTodoController} = require('../controller/deleteTodoController')
const {gettodoscontroller} = require('../controller/gettodoscontroller')
const {gettodocontroller} = require('../controller/gettodocontroller')
const {createTaskTodoController} = require('../controller/createTaskTodoController')
const {deleteTaskTodoController} = require('../controller/deleteTaskTodoController')
const {editTodoController} = require('../controller/editTodoController')
const {editTaskTodoController} = require('../controller/editTaskTodoController')
const {register} = require('../controller/register')
const {login} = require('../controller/login')
const {logout} = require('../controller/logout')
const {validateCookie} = require('../controller/validateCookie')

const router = express.Router()

const auth = require('../middleware/auth')

router.get("/",home)

// todo routers
router.get("/gettodocontroller/:id",auth,gettodocontroller)
router.get("/gettodoscontroller",auth,gettodoscontroller)
router.delete("/deleteTodoController/:id",auth,deleteTodoController)
router.post("/createTodoController",auth,createTodoController)
router.patch("/editTodoController/:id",auth,editTodoController)
// task routers
router.patch("/createTaskTodoController/:id",auth,createTaskTodoController)
router.patch("/deleteTaskTodoController/:id",auth,deleteTaskTodoController)
router.patch("/editTaskTodoController/:id",auth,editTaskTodoController)
// users routers
router.post('/register',register)
router.post('/login',login)
router.post('/logout',auth,logout)
router.get('/validateCookie',auth,validateCookie)

module.exports = router