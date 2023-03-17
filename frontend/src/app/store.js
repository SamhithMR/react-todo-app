import {create} from "zustand";
import axios from "axios"

let todos = ((set,get) => ({
    
    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
    
    query:"",
    setQuery: (query)=>{
        set(()=>({
            query:query
        }))
    },
    
    todos: [],
    setTodo: async () => {
        set(()=>({isLoading:true}))
        let resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/todos?search=${get().query}`,{withCredentials:true});
        set(()=>({isLoading:false}))
        set(() => ({
            todos: [...resp.data.todos]
        }));
    },
    getTodo: () => get().todos,
}))

let useTodos = create(todos)

export default useTodos;