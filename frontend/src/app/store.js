import {create} from "zustand";
import axios from "axios"

let todos = ((set,get) => ({
    todos: [],
    query:"",
    setQuery: (query)=>{
        set(()=>({
            query:query
        }))
    },
    setTodo: async () => {
        let resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/todos?search=${get().query}`,{withCredentials:true});
        set(() => ({
            todos: [...resp.data.todos]
        }));
    },
   getTodo: () => get().todos
}))

let useTodos = create(todos)

export default useTodos;