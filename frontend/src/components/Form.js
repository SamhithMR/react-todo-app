import axios from "axios"
import {useState} from 'react'
import useTodos from "../app/store"

function Form(){
    const [title, setTitle] = useState("")
    const setTodo = useTodos((state) => state.setTodo)
    
    async function createTodo(){
      if(title !== ""){
        useTodos.setState({ isLoading: true });
        await axios.post(`${process.env.REACT_APP_BASE_URL}/api/todos`, {title},{withCredentials:true});
        useTodos.setState({ isLoading: false });
        setTodo() 
      }
        setTitle("")
    }

    return(
        <div className=" py-5 flex items-center justify-center">
          <form onSubmit={(e) => { e.preventDefault(); createTodo();}} className="relative">
            <div className="flex items-center">
              <input
                placeholder="add todo"
                name={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-md w-[20rem] p-2 outline-none"
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