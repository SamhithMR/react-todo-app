import {create} from "zustand";
import axios from "axios"
import BASE_URL from "../components/apiConfig";

let todos = ((set,get) => ({
    todos: [],
    query:"",
    setQuery: (query)=>{
        set(()=>({
            query:query
        }))
    },
    setTodo: async () => {
        let resp = await axios.get(`${BASE_URL}/api/todos?search=${get().query}`);
        set(() => ({
            todos: [...resp.data.todos]
        }));
    },
   getTodo: () => get().todos
}))

let useTodos = create(todos)

export default useTodos;