import {create} from "zustand";
import axios from "axios"

let todos = ((set,get) => ({
    todos: [],
    setTodo: async () => {
        let resp = await axios.get("/gettodoscontroller");
        set(() => ({
            todos: [...resp.data.todos]
        }));
    },
   getTodo: () => get().todos
}))

let useTodos = create(todos)

export default useTodos;