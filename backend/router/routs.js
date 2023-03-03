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
router.get("/api/getTodo/:id",auth,gettodocontroller)
router.get("/api/todos",auth,gettodoscontroller)
router.delete("/api/todos/:id",auth,deleteTodoController)
router.post("/api/todos",auth,createTodoController)
router.patch("/api/todos/:id",auth,editTodoController)
// task routers
router.patch("/api/createTask/:id",auth,createTaskTodoController)
router.patch("/api/deleteTask/:id",auth,deleteTaskTodoController)
router.patch("/api/editTask/:id",auth,editTaskTodoController)
// users routers
router.post('/u/register',register)
router.post('/u/login',login)
router.post('/u/logout',auth,logout)
router.get('/u/getUser',validateCookie)

module.exports = router