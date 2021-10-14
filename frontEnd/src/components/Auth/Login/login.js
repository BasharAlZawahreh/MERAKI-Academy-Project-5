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
      if (res.data) {
        setMessage("");
        dispatch(setToken(res.data.token))
        localStorage.setItem("token", res.data.token);
        history.push("/slide");
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

const Enter= async(e)=>{
  e.preventDefault()
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
          history.push("/slide"); 
          
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
        dispatch(setToken(localStorage.getItem("token")));
        
        //   history.push("/slide");
    }
  });

    return(
      
        <>
           <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                        <a href="#" class="signup-image-link">Create an account</a>
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Login</h2>
                        <form onSubmit={Enter} class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" onChange={(e)=>{setEmail(e.target.value)}} id="your_name" placeholder="Your Email"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" onChange={(e)=>{setPassword(e.target.value)}} id="your_pass" placeholder="Password"/>
                            </div>
                            <div class="form-group form-button">
                                <button name="signin" id="signin" class="form-submit">Login</button>
                            </div>
                        </form>
                {message && <div>{message}</div>}

                        <div class="social-login">
                            <span class="social-label">Or login with</span>
                            <ul class="socials">
                            <GoogleLogin
        clientId="748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(response)=>responsesuccessGoogle(response)}
        onFailure={(response)=>responseErrorGoogle(response)}
        cookiePolicy={'single_host_origin'}
        
        />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Login;