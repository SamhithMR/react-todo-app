import axios from "axios"
import {useEffect, useState, useRef} from "react"
import '../index.css'
import useTodos from "./store"
import Tasks from './Tasks'

function Todo({data, id, onTodoDeleted, onTodoEdited}){
    const [task, setTask] = useState("")
    const [title, setTitle] = useState([])
    const [isEditable, setIsEditable] = useState(false);

    const setTodo = useTodos((state) => state.setTodo)
    
    async function addTask(){
        const resp = await axios.patch(`/createTaskTodoController/${id}`,{task})
        setTask("")
        setTodo()
    }
    
    useEffect(()=>{
        setTitle(data.title)
    },[task])

    function handleTodo(e){
        onTodoEdited(id,title);
         e.preventDefault()
    }

    return(
        <div className="flex">
            <div className="card bg-gray-600 flex flex-col items-center justify-center rounded-md p-2 gap-2 min-w-[10rem] min-h-[12rem]">
                <form className="taskInput" onSubmit={handleTodo}>
                    <input value={title} readOnly={!isEditable} name={title} onChange={(e) =>(setTitle(e.target.value))}/>
                    <button onClick={()=>(setIsEditable(!isEditable))}>{isEditable ? "save" : "edit"}</button>
                </form>
                <div className="bg-gray-400 p-2 g-2">
                <form  onSubmit={(e)=>{addTask(); e.preventDefault()}}>
                    <input name={task} value={task} onChange={(e)=>(setTask(e.target.value))}/>
                    <button type="submit">add</button>
                </form>
              <Tasks id={id}/>
                </div>
                <button onClick={()=>(onTodoDeleted(id))}>delet todo</button>
            </div>
        </div>
    )
      }
export default Todo

