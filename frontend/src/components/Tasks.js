import axios from "axios"
import {useEffect, useState} from "react"
import '../index.css'
import useTodos from "./store"

function Tasks({id}){

    const [tasks, setTasks] = useState([])
    const [text, setText] = useState("")
    const [isEditable, setIsEditable] = useState(false);

    const setTodo = useTodos((state) => state.setTodo)
    const todos = useTodos((state) => state.todos)
    const taskss = todos.find((x) =>(x._id == id)).task
    
    async function deletTask(task){
        const resp = await axios.patch(`/deleteTaskTodoController/${id}`,{task})
        setTodo()
    }
    async function editTask(i){
        const resp = await axios.patch(`/editTaskTodoController/${id}`,{text,index:i})
        setTodo()
    }


    useEffect(()=>{
        setTasks(taskss)
    },[taskss])

    return(<div className="ListOfTasks">
    {tasks.map((task,i)=>{
        return(
            <form onSubmit={(e) =>{e.preventDefault(); editTask(i)}} className="bg-gray-200 gap-2  flex p-2 m-2" key={i}>
                <input  defaultValue={task}  readOnly={!isEditable} name={text} onChange={(e)=>(setText(e.target.value))}/>
                <button type="submit"  onClick={()=>(setIsEditable(!isEditable))}>{isEditable ? "save" : "edit"}</button>
                <p onClick={()=>{deletTask(task)}}>delet</p>
            </form>
        )
    })}
</div>)
    
}
export default Tasks