import {create} from "zustand";
import {devtools,persist} from 'zustand/middleware'
import axios from "axios"

let todos = ((set) => ({
    todos: [],
    setTodo: async () => {
        let resp = await axios.get("/gettodoscontroller");
        set(() => ({
            todos: [...resp.data.todos]
        }));
    }
}))

let useTodos = create(
    devtools(
        persist(
            todos, {
                name: "todo"
            }
        )
    )
)

export default useTodos;