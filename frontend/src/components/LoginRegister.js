import { useState } from "react"
import Login from './Login'
import Register from './Register'

function LoginRegister({redirect}){

    const [block, setBlock] = useState(false)

    return(
    <div className="grid grid-cols-7 w-screen h-screen">
        <div className=" col-span-4 glow flex flex-col justify-center p-4 gap-6">
            <h1 className="text-white text-[13vh] font-[900] font-noto"><span className="text-[16vh]">D</span>oi<span className="text-[16vh]">T</span></h1>
            <h5 className="text-white text-xl">Your Personal Productivity Assistant</h5>
            <p className="text-slate-400 tracking-wide font-Poppins pr-8 leading-6 text-xs md:w-5/6">DoIt is a to-do application designed to help you stay organized and increase your productivity. With DoIt, you can create tasks and to-do lists, set reminders and due dates, and track your progress as you complete each task. Whether you're managing a busy work schedule or simply trying to stay on top of your personal goals, DoIt makes it easy to stay organized and stay focused on what matters most.</p>
        </div>

        <Login style={{"display":`${block ? "none" : "flex"}`}} display={()=>(setBlock(!block))} redirects={redirect}/>
        <Register style={{"display":`${block ? "flex" : "none"}`}} display={()=>(setBlock(!block))}/>
        
    </div>
    )
}
export default LoginRegister
