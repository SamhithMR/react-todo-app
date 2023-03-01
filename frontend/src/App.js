import './App.css';
import Todos from "./components/Todos"
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginRegister from './components/LoginRegister';
import useTodos from "./app/store"

function App() {

  const [logedin, setLogedin] = useState(false)
  const todos = useTodos((state) => state.todos);
  const setTodo = useTodos((state) => state.setTodo);

  useEffect(() => {
    const getSession = async () => {
      try{
        const resp = await axios.get('/validateCookie')
        setLogedin(resp.data.sucess);
        
      }catch(err){
        setLogedin(false)
      }
    }
    getSession();
  }, []);

  useEffect(()=>{
    if(logedin){
      setTodo(todos)
    }
  },[logedin])

  function handlelogin(){
    setLogedin(!logedin)
  }

  return (
    <div className="App bg-slate-900 h-[100%]">
      {logedin ? <Todos redirect={handlelogin}/> : <LoginRegister redirect={handlelogin}/>}
    </div>
  );
}

export default App
