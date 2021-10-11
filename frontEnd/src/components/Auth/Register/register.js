import React,{useState} from "react";
import axios from "axios";

const Register=()=>{
    const[firstName,serFirstName]=useState()
    const[lastName,setLastName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[done,setDone]=useState()




    return (<div className="Register">
    <input type="text" placeholder="firstName" onChange={(e)=>{
        serFirstName(e.target.value)
    }} />
    <input type="text" placeholder="lastName" onChange={(e)=>{
        setLastName(e.target.value)
    }} />
    <input type="email" placeholder="email" onChange={(e)=>{
        setEmail(e.target.value)
    }} />
    <input type="password" placeholder="password" onChange={(e)=>{
        setPassword(e.target.value)
    }} />

    <button onClick={()=>{
        axios.post("http://localhost:5000/users",{firstName,lastName,email,password}).then((result)=>{
            setDone(<div className="succes">the user has been added successfully</div>)
        }).catch((err)=>{
            setDone(<div className="wrong">error happen while regeister please try again</div>)
        })

    }} >Register</button>
    {done}
    </div>
    )
}

export default Register