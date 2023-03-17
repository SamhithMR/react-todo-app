import express from 'express';
import auth from '../middleware/auth.js';
const router = express.Router();

import {home, getTodo, getTodos, deletTodo, addTodo, editTodo, createTask, deleteTask, editTask, register, login, logout, getuser} from '../controller/user.controller.js'

router.get("/", home)

// todo routers
router.get("/api/getTodo/:id", auth, getTodo)
router.get("/api/todos",auth, getTodos)
router.delete("/api/todos/:id",auth, deletTodo)
router.post("/api/todos",auth, addTodo)
router.patch("/api/todos/:id",auth,editTodo)

// task routers
router.patch("/api/createTask/:id", auth, createTask)
router.patch("/api/deleteTask/:id", auth, deleteTask)
router.patch("/api/editTask/:id", auth, editTask)

// users routers
router.post('/u/register',register)
router.post('/u/login',login)
router.post('/u/logout',auth,logout)
router.get('/u/getUser',getuser)

export default router