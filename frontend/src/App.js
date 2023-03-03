import './App.css';
import Todos from "./components/Todos"
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginRegister from './components/LoginRegister';
import useTodos from "./app/store"
import BASE_URL from "./components/apiConfig";

function App() {

  const [resp, setResp] = useState({})

  const todos = useTodos((state) => state.todos);
  const setTodo = useTodos((state) => state.setTodo);

  const getSession = async () => {
    try{
      const resps = await axios.get(`${BASE_URL}/u/getUser`)
      setResp(resps.data);
    }catch(err){
      setResp(prev => ({ ...prev, sucess: false }));
      }
    }

  useEffect(()=>{
    getSession();
    if(resp.sucess){
      setTodo(todos)
    }
  },[resp.sucess])

  const handlelogin = () => {
    setResp(prev => ({ ...prev, sucess: !resp.sucess }));
  };
  
  return (
    <div className="App bg-slate-900 h-[100%]">
      {resp.sucess ? <Todos redirect={handlelogin} email={resp.email}/> : <LoginRegister redirect={handlelogin}/>}
    </div>
  );
}
export default App