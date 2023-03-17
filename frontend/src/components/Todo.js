import axios from "axios"
import {useEffect, useState, useRef} from "react"
import '../App.css'
import useTodos from "../app/store"
import Tasks from './Tasks'

function Todo({data, id, onTodoDeleted, onTodoEdited}){
    const [task, setTask] = useState("")
    const [title, setTitle] = useState([])
    const [isEditable, setIsEditable] = useState(false);

    const setTodo = useTodos((state) => state.setTodo)
    
    async function addTask(){
        if(task !== ""){
            useTodos.setState({ isLoading: true });
            await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/createTask/${id}`,{task},{withCredentials:true})
            useTodos.setState({ isLoading: false });
        }
        setTask("")
        setTodo()
    }

    useEffect(()=>{
        setTitle(data.title)
    },[task, data])

    function handleTodo(e){
        onTodoEdited(id,title);
         e.preventDefault()
    }

    return(
        <div className="todo bg-gray-600 flex flex-col justify-between rounded-md h-[20rem] overflow-y-scroll overflow-x-hidden hidescrollba">
            <form className="group taskInput relative flex items-center w-[100%]" onSubmit={handleTodo}>
                <input className="w-[100%] text-center font-bold text-[1.2rem] bg-transparent font-noto text-gray-300 tracking-wider outline-none" value={title} readOnly={!isEditable} name={title} onChange={(e) =>(setTitle(e.target.value))}/>
                <button className="hidden group-hover:block absolute right-2 top-1/2 transform -translate-y-1/2" onClick={()=>(setIsEditable(!isEditable))}>{isEditable ? <i className="fa fa-check text-green-400"></i> : <i className="fas fa-edit text-gray-800"></i>}</button>
            </form>
            <Tasks id={id}/>
            <div className="w-[100%]">
                <form  className="relative flex items-center my-3" onSubmit={(e)=>{addTask(); e.preventDefault()}}>
                    <input className="w-[100%] py-1 px-3 outline-none" name={task} value={task} placeholder="add tasks" onChange={(e)=>(setTask(e.target.value))}/>
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2"><i className="fas fa-circle-plus text-slate-600 circle-plus-icon text-[1.25rem]"/></button>
                </form>
                <button className="bg-gray-300 py-[0.2rem] text-slate-800 hover:text-red-500 justify-self-end w-[100%]" onClick={()=>(onTodoDeleted(id))}>delete todo</button>
            </div>
        </div>
    )
      }
export default Todo

