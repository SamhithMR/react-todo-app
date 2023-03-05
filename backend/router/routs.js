import express from 'express';

import  home  from '../controller/home.js';
import createTodoController from '../controller/createTodoController.js';
import  deleteTodoController  from '../controller/deleteTodoController.js';
import  gettodoscontroller  from '../controller/gettodoscontroller.js';
import  gettodocontroller  from '../controller/gettodocontroller.js';
import  createTaskTodoController  from '../controller/createTaskTodoController.js';
import  deleteTaskTodoController  from '../controller/deleteTaskTodoController.js';
import  editTodoController  from '../controller/editTodoController.js';
import  editTaskTodoController  from '../controller/editTaskTodoController.js';
import  register  from '../controller/register.js';
import  login  from '../controller/login.js';
import  logout  from '../controller/logout.js';
import  validateCookie  from '../controller/validateCookie.js';

import auth from '../middleware/auth.js';

const router = express.Router();


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

export default router