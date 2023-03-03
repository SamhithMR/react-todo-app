import { useEffect, useState } from 'react'
import Todo from './Todo'
import useTodos from "../app/store"
import axios from "axios"
import Form from "./Form"

function Todos({redirect,email}) {
  const [todoss, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const setTodo = useTodos((state) => state.setTodo);
  const todos = useTodos((state) => state.getTodo());
  const setQuery = useTodos((state) => state.setQuery);

  useEffect(()=>{
    setQuery(search)
    setTodo()
  },[search])
  
const [filter, setFilter] = useState("createdAt")

  useEffect(() => {
    if(filter == "updatedAt"){
      setTodos(todos.sort((x,y)=>((new Date(y.updatedAt)) - (new Date(x.updatedAt)))))
    }
    else if(filter == "createdAt"){
     setTodos(todos.sort((x,y)=>((new Date(x.createdAt)) - (new Date(y.createdAt)))))
    }
  });

  async function handleTodoDeleted(todoId) {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/todos/${todoId}`,{withCredentials:true});
    setTodo();
  }
  
  async function handleonTodoEdited(todoId, title) {
  
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/todos/${todoId}`, { title },{withCredentials:true});
    setTodo();
  }
  
  function handlelogout(){
    axios.post(`${process.env.REACT_APP_BASE_URL}/u/logout`,{} ,{withCredentials:true}).then(redirect())
  }
  
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
        <div className='relative flex gap-2'>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search..." className="py-2 px-8 rounded-md outline-none"/>
          <select name='type' className='rounded-md text-sm px-2' onChange={(e) => {setFilter(e.target.value)}}>
            <option value={"updatedAt"}>updatedAt</option>
            <option value={"createdAt"}>createdAt</option>
          </select>
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
