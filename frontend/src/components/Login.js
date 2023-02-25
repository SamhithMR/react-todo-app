import axios from "axios"
import { useState } from "react"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(email,password){
        const resp = await axios.post("/Login",{email:email, password:password})
        console.log(resp);
    }

    return(
        <form onSubmit={(e)=>{e.preventDefault();handleLogin(email,password)}}>
            <input name={email} value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input name={password} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">submit</button>
        </form>
    )
}
export default Login