import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {setToken} from '../../../actions/login';
import axios from 'axios';
const Login=()=>{
const history=useHistory();
const dispatch=useDispatch();
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [password, setPassword] = useState("");
const state=useSelector((state)=>{
    return {
        token:state.token.token
    }
});
const Enter= async()=>{
    try {
        const res = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        if (res.data.success) {
          setMessage("");
          dispatch(setToken(res.data.token))
          localStorage.setItem("token", res.data.token);
          console.log("Yes");
          
        }
    }catch (error) {
        if (error.response && error.response.data) {
            return setMessage(error.response.data.message);
        }
        setMessage("Error happened while Login, please try again");
    }
    
}

useEffect(() => {
    if (state.token) {
        // alert("Yes");
        dispatch(setToken(localStorage.getItem("token")));
        console.log(state.token);
        //   history.push("/dashboard");
    }
  });

    return(
        <>
            <div>
                <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Here" type="text"/>
                <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password Here" type="password"/>
                <button onClick={Enter}>Login</button>
                {message && <div>{message}</div>}
            </div>

        </>
    )
}

export default Login;