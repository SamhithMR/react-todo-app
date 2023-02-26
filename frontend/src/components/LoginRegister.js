import { useState } from "react"
import Login from './Login'
import Register from './Register'

function LoginRegister({redirect}){

    const [block, setBlock] = useState(false)

    function handleDisplay(){
        setBlock(!block)
    }

    return(
    <div className="grid grid-cols-7 w-screen h-screen ">
        <div className="col-span-4">
            <h1>DoiT</h1>
            <h5>Your Personal Productivity Assistant</h5>
            <p>DoIt is a to-do application designed to help you stay organized and increase your productivity. With DoIt, you can create tasks and to-do lists, set reminders and due dates, and track your progress as you complete each task. Whether you're managing a busy work schedule or simply trying to stay on top of your personal goals, DoIt makes it easy to stay organized and stay focused on what matters most.</p>
        </div>

        <Login style={{"display":`${block ? "none" : "flex"}`}} display={handleDisplay} redirects={redirect}/>
        <Register style={{"display":`${block ? "flex" : "none"}`}} display={handleDisplay}/>
        
    </div>
    )
}
export default LoginRegister
