import {useEffect, useState} from "react"
import '../App.css'

function Task({data,i,handleedit, handledelet}){
    const [text, setText] = useState("")
    const [isEditable, setIsEditable] = useState(false);
    const [dataa, setData] = useState('')

    useEffect(()=>{
        setData(data)
    },[data])

    return(
        <form onSubmit={(e) =>{e.preventDefault(); handleedit(i,text)}} className=" gap-2 flex relative items-center w-[100%] py-1" key={i}>
            <input className="outline-none text-center bg-transparent w-[100%] text-zinc-200 tracking-wide font-Poppins text-[0.8rem]" defaultValue={dataa}  readOnly={!isEditable} name={text} onChange={(e)=>(setText(e.target.value))}/>
            <button className="absolute right-0 pr-3" type="submit"  onClick={()=>(setIsEditable(!isEditable))}>{isEditable ? <i className="fa fa-check text-green-400"></i> :<i className="fa fa-pen"></i>}</button>
            <p className="absolute left-0 pl-3 cursor-pointer" onClick={()=>{handledelet(dataa)}}><i className="fa fa-minus"></i></p>
        </form>
    )
}

export default Task