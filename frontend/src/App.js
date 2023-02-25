import './App.css';

import Todos from "./components/Todos"
import Login from "./components/Login"
import Register from "./components/Register"
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App bg-slate-400 h-screen">
      {/* <MyComponent/> */}

      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Todos" element={<Todos/>} />
    </Routes>
    </div>
  );
}

export default App
