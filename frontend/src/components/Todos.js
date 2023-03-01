import { useEffect, useState } from 'react'
import Todo from './Todo'
import useTodos from "../app/store"
import axios from "axios"
import Form from "./Form"

function Todos({redirect}) {
  const [todoss, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const setTodo = useTodos((state) => state.setTodo);
  const todos = useTodos((state) => state.getTodo());

 const updateTodo = useTodos((state)=> state.getTodo())

  const [email, setEmail] = useState('');
  
  useEffect(() => {
    setTodos(todos);
  },[todoss, todos]);

  
  async function handleTodoDeleted(todoId) {
    await axios.delete(`/deleteTodoController/${todoId}`);
    setTodo();
    setTodos(todos);
  }
  
  async function handleonTodoEdited(todoId, title) {
    await axios.patch(`/editTodoController/${todoId}`, { title });
    setTodo();
    setTodos(todoss);
  }
  
  function handlelogout(){
    axios.post('/logout');
    redirect()
  }
  
  useEffect(() => {
    axios.get('/getUserEmail')
      .then(response => {
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
    
    return (
      <div className='w-[95%] mx-auto py-4 flex flex-col h-[100%] min-h-[150vh] '>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-[5vh] font-[900] font-noto"><span className="text-[7vh]">D</span>oi<span className="text-[7vh]">T</span></h1>
        <div className="flex gap-2 text-white items-center">
          <p className='text-xs font-Poppins'>{email}</p>
          <button onClick={()=>(handlelogout())} ><i className="fa fa-sign-out text-2xl"></i></button>
        </div>
      </div>
      <div className="flex md:justify-between items-center flex-wrap justify-center">
        <Form />
        <div className='relative'>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search..." className="py-2 px-8 rounded-md"/>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-4 gap-6 items-center justify-center">
        {todoss.map((todo, i) => {
          return (
              <Todo
                data={todo}
                key={i}
                id={todo._id}
                onTodoDeleted={handleTodoDeleted}
                onTodoEdited={handleonTodoEdited}
              />
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
