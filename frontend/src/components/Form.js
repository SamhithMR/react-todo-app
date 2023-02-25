import axios from "axios"
import {useState} from 'react'
import useTodos from "./store"

function Form(){
 
    const [title, setTitle] = useState("")
    const setTodo = useTodos((state) => state.setTodo)
    
    async function createTodo(){
      await axios.post("/createTodoController", {title});
        setTitle("")
    }

    return(
        <div className="p-6 flex items-center justify-center">
<form onSubmit={(e) => { e.preventDefault(); createTodo(); setTodo() }} className="relative">
  <div className="flex items-center">
    <input
      placeholder="   add todo"
      name={title}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="rounded-md min-h-[2.8rem] w-[20rem] pr-[3rem] pb-0"
    />
    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
    <i 
      className="fas fa-circle-plus text-gray-500 circle-plus-icon"
      style={{ fontSize: '2rem' }}
    />
    </button>
  </div>
</form>

        </div>
    )
}
export default Form