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
      const resp = await axios.get('/validateCookie')
      setLogedin(resp.data.sucess)
    };
    getSession();
    setTodo(todos)
  }, [logedin]);

  function handlelogin(){
    setLogedin(true)
  }

  return (
    <div className="App bg-slate-900 h-screen">
      {logedin ? <Todos /> : <LoginRegister redirect={handlelogin}/>}
    </div>
  );
}

export default App
