import axios from "axios"
import { useState } from "react"

function Register({display}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [Cpassword, setCpassword] = useState("")

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    async function handleRegister(email,password){
        try{
            if (emailRegex.test(email)){
                if(Cpassword === password){
                    const resp = await axios.post("/register",{email:email, password:password})
                    setErr(resp.data.message);
                    display()
                }
                else{
                    setErr("passwords does not match")
                }
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
        <div className="col-span-3 relative h-screen flex flex-col justify-center gap-12 text-xl">
            <div className="bg-gray-600 h-screen absolute left-0 w-2/4"></div>
            <h1 className="font-heading text-white relative text-center font-extrabold text-5xl pr-15 tracking-widest">register</h1>
            <form className="flex flex-col gap-8 z-20 relative  items-start" onSubmit={(e)=>{e.preventDefault();handleRegister(email,password)}}>
                <input className="rounded-sm p-2 w-3/4 outline-none bg-transparent border-b border-yellow-300" placeholder="email" name={email} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <div className="w-3/4">
                    <input className="rounded-sm p-2 outline-none bg-transparent border-b border-yellow-300" placeholder="password" name={password} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <div className="w-3/4">
                    <input className="rounded-sm p-2 outline-none bg-transparent border-b border-yellow-300" placeholder="confirm password" value={Cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
                    <p>{err}</p>
                </div>
                <button type="submit" className="text-yellow-300 border border-yellow-300 px-6 py-2 hover:bg-yellow-300 hover:text-gray-800 transition duration-300 ease-in-out ">register</button>
            </form>
            <p className="z-20 relative">alredy have an account <button className="text-white" onClick={()=>{display(); setEmail("");setPassword("");setErr("");setCpassword("")}}>login</button></p>
        </div>
    )
}
export default Register