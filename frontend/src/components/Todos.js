import { useEffect, useState } from 'react'
import Todo from './Todo'
import useTodos from "../app/store"
import axios from "axios"
import Form from "./Form"

function Todos() {
  const [todoss, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const todos = useTodos((state) => state.todos);
  const setTodo = useTodos((state) => state.setTodo);

  useEffect(() => {
    setTodos(todos);
  }, [todos]);
  

  useEffect(() => {
    const searchValue = search.toLowerCase();
    const filteredTodos = todos.filter((todo) => {
      return (
        todo.title.toLowerCase().includes(searchValue) ||
        todo.task.some((title) => title.toLowerCase().includes(searchValue))
      );
    });
    setTodos(searchValue ? filteredTodos : todos);
  }, [search, todos]);

  async function handleTodoDeleted(todoId) {
    await axios.delete(`/deleteTodoController/${todoId}`);
    setTodo();
    setTodos(todoss.filter((todo) => todo._id !== todoId));
  }

  async function handleonTodoEdited(todoId, title) {
    await axios.patch(`/editTodoController/${todoId}`, { title });
    setTodo();
// ---------------
    const updatedTodos = todoss.map((todo) => {
      if (todo._id === todoId) {
        return { ...todo, title };
      }
      return todo;
    });
    setTodos(updatedTodos);
    // setTodos(todoss);
  }

  return (
    <>
      <Form />
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="grid grid-cols-4 gap-2">
        {todoss.map((todo, i) => {
          return (
            <div key={i}>
              <Todo
                data={todo}
                key={i}
                id={todo._id}
                onTodoDeleted={handleTodoDeleted}
                onTodoEdited={handleonTodoEdited}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Todos;
