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
const router = express.Router()

router.get("/",home)
// todo
router.get("/gettodocontroller/:id",gettodocontroller)
router.get("/gettodoscontroller",gettodoscontroller)
router.delete("/deleteTodoController/:id",deleteTodoController)
router.post("/createTodoController",createTodoController)
router.patch("/editTodoController/:id",editTodoController)
// task
router.patch("/createTaskTodoController/:id",createTaskTodoController)
router.patch("/deleteTaskTodoController/:id",deleteTaskTodoController)
router.patch("/editTaskTodoController/:id",editTaskTodoController)

module.exports = router