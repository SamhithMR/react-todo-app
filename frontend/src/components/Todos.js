import { useEffect, useState } from 'react'
import Todo from './Todo'
import useTodos from "./store"
import axios from "axios"

function Todos(){
    const [todoss, setTodos] = useState([]);
    const todos = useTodos((state) => state.todos)
    const setTodo = useTodos((state) => state.setTodo)

    useEffect(()=>{
       setTodos(todos)
    },[todos])
    

    async function handleTodoDeleted(todoId) {
        await axios.delete(`/deleteTodoController/${todoId}`)
        setTodo()
        setTodos( todoss.filter(todo => todo._id !== todoId))
      }

    async function handleonTodoEdited(todoId, title) {
        const resp = await axios.patch(`/editTodoController/${todoId}`, {title})
        setTodo()
        setTodos(todoss)
      }

    return(
        <div className="grid grid-cols-4 gap-2">
           { todoss.map((todo,i)=>{
            return(
            <div key={i}>
                 <Todo 
                 data={todo}
                  key={i} 
                  id={todo._id} 
                  onTodoDeleted={handleTodoDeleted}
                  onTodoEdited={handleonTodoEdited}
                  />
            </div>
            )
            })}
        </div>
    )
}

export default Todos