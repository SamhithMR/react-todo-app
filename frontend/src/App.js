import './App.css';
import Todos from "./components/Todos"
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoginRegister from './components/LoginRegister';
import useTodos from "./app/store"
import { ThreeDots } from 'react-loader-spinner'

function App() {
  const isLoading = useTodos((state) => state.isLoading);
  const [resp, setResp] = useState({})

  const todos = useTodos((state) => state.todos);
  const setTodo = useTodos((state) => state.setTodo);

  const getSession = async () => {
    try{
      const resps = await axios.get(`${process.env.REACT_APP_BASE_URL}/u/getUser`,{withCredentials:true})
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
      {isLoading && (<div className="loading"><ThreeDots  height="80" width="80"  radius="9"  color="#404f63"  ariaLabel="three-dots-loading" visible={true} /></div>)}
    </div>
  );
}
export default App