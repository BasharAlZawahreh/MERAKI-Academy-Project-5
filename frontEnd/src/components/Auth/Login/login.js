import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {setToken} from '../../../actions/login';
import axios from 'axios';
import GoogleLogin from 'react-google-login'
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


const  responsesuccessGoogle=(response)=>{
    // console.log(response.profileObj);
    axios.post("http://localhost:5000/login/loginWithGoogle",{tokenId: response.tokenId})
    .then((res) => {
      console.log("NAif",res);
      if (res.data) {
        setMessage("");
        dispatch(setToken(res.data.token))
        localStorage.setItem("token", res.data.token);
        // history.push("/home");
      } else throw Error;
  }).catch((err) =>{
      if(err.message){
        setMessage("Error happened while Login, please try again");
        console.log(message);
      }
  })
    
  }
  const  responseErrorGoogle=(response)=>{
    setMessage("responseErrorGoogle => Error happened while Login, please try again");
    console.log(message);
    
    
  }

const Enter= async()=>{
    try {
        const res = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        if (res.data.success) {
          setMessage("");
          console.log(res.data);
          dispatch(setToken(res.data.token))
          localStorage.setItem("token", res.data.token);
          
          
        }
    }catch (error) {
        if (error.response && error.response.data) {
            return setMessage(error.response.data.message);
        }
        setMessage("Error happened while Login, please try again");
    }
    
}

useEffect(() => {

    if (!state.token) {
        // alert("Yes");
        dispatch(setToken(localStorage.getItem("token")));
        
        //   history.push("/dashboard");
    }
  });

    return(
        <>
            <div>
                <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Here" type="text"/>
                <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password Here" type="password"/>
                <button onClick={Enter}>Login</button>
                <GoogleLogin
        clientId="748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response)=>responsesuccessGoogle(response)}
        onFailure={(response)=>responseErrorGoogle(response)}
        cookiePolicy={'single_host_origin'}
        
        />
                {message && <div>{message}</div>}
            </div>

        </>
    )
}

export default Login;