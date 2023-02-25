import './App.css';
import Form from "./components/Form"
import Todos from "./components/Todos"

function App() {
  return (
    <div className="App bg-slate-400 h-screen">
      <Form />
      <Todos />
      {/* <MyComponent/> */}
    </div>
  );
}

export default App
