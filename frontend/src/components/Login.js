import axios from "axios"
import { useState } from "react"

function Login({redirects,display,style}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    async function handleLogin(email,password){
        try{
            if (emailRegex.test(email)){
                const resp = await axios.post("/login",{email:email, password:password})
                setErr(resp.data.message)
                redirects()
            }
            else{
                setErr("Enter a valid email")
            }
        }
        catch(err){
            setErr(err.response.data.message);
        }
    }
    
    return(
        <div className="col-span-3 relative h-screen flex flex-col justify-center gap-12 text-xl items-center" style={style}>
            <div className="bg-gray-600 h-screen absolute left-0 w-2/4"></div>
            <h1 className=" text-white relative text-center font-extrabold text-5xl pr-15 tracking-widest">Welcome back</h1>
            <form className="flex flex-col gap-8 z-20 relative font-noto text-[1.1rem] items-start" onSubmit={(e)=>{e.preventDefault();handleLogin(email,password)}}>
                <div className="w-3/4 relative flex items-center">
                    <i className="fa fa-envelope absolute left-0 text-white" aria-hidden="true"></i>
                    <input className="rounded-sm p-2 pl-7 text-slate-400 outline-none bg-transparent border-b border-yellow-300" placeholder="email" name={email} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>                
                <div className="w-3/4 relative flex items-center">
                <i className="fa fa-key absolute left-0 text-white" aria-hidden="true"></i>
                    <input className="text-slate-400 rounded-sm p-2 pl-7 outline-none bg-transparent border-b border-yellow-300" placeholder="password" name={password} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <p>{err}</p>
                </div>
                <button type="submit" className="text-yellow-300 border border-yellow-300 px-6 py-2 hover:bg-yellow-300 hover:text-gray-800 transition duration-300 ease-in-out ">login</button>
            </form>
            <p className="z-20 relative text-[0.7rem] font-heading text-slate-400">don't have an account <button className="text-white underline underline-offset-4 hover:text-slate-500 transition duration-300 ease-in-out" onClick={()=>{display() ;setEmail("");setPassword("");setErr("");}}>register</button></p>
        </div>
    )
}
export default Login