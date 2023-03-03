import axios from "axios"
import {useEffect, useState} from "react"
import '../index.css'
import useTodos from "../app/store"
import Task from "./Task"

function Tasks({id}){
    const [tasks, setTasks] = useState([])
    const setTodo = useTodos((state) => state.setTodo)
    const todos = useTodos((state) => state.getTodo())

    useEffect(() => {
        setTasks(todos.find((x) => x._id === id)?.task || []);
    },[id,todos]);
    
    async function deletTask(task){
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/deleteTask/${id}`,{task},{withCredentials:true})
        setTodo()
        setTasks(todos.find((x) => x._id === id)?.task || []);
    }
    async function editTask(i,text){
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/editTask/${id}`,{text,index:i},{withCredentials:true})
        setTodo()
    }
    return(
    <div className="tasks max-h-[70%] overflow-y-scroll flex gap-2 flex-col">
    {tasks.map((task,i)=>{return(<Task key={i} data={task} i={i} handleedit={editTask} handledelet={deletTask}/>)})}
</div>)

    
}
export default Tasks