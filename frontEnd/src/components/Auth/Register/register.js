import React,{useState} from "react";
import axios from "axios";
import './register.css'
const Register=()=>{
    const[firstName,serFirstName]=useState()
    const[lastName,setLastName]=useState()
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[done,setDone]=useState()




    return (
        <section class="signup">
        <div class="container">
            <div class="signup-content">
                <div class="signup-form">
                    <h2 class="form-title">Sign up</h2>
                    <form method="POST" class="register-form" id="register-form">
                        <div class="form-group">
                            <label for="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                            <input type="text" name="name" id="name" placeholder="Your Name"/>
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="zmdi zmdi-email"></i></label>
                            <input type="email" name="email" id="email" placeholder="Your Email"/>
                        </div>
                        <div class="form-group">
                            <label for="pass"><i class="zmdi zmdi-lock"></i></label>
                            <input type="password" name="pass" id="pass" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <label for="re-pass"><i class="zmdi zmdi-lock-outline"></i></label>
                            <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"/>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" name="agree-term" id="agree-term" class="agree-term" />
                            <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                        </div>
                        <div class="form-group form-button">
                            <input type="submit" name="signup" id="signup" class="form-submit" value="Register"/>
                        </div>
                    </form>
                </div>
                
                <div class="signup-image">
                    <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                    <a href="#" class="signup-image-link">I am already member</a>
                </div>
            </div>
        </div>
    </section>
    // <div className="Register">
    // <input type="text" placeholder="firstName" onChange={(e)=>{
    //     serFirstName(e.target.value)
    // }} />
    // <input type="text" placeholder="lastName" onChange={(e)=>{
    //     setLastName(e.target.value)
    // }} />
    // <input type="email" placeholder="email" onChange={(e)=>{
    //     setEmail(e.target.value)
    // }} />
    // <input type="password" placeholder="password" onChange={(e)=>{
    //     setPassword(e.target.value)
    // }} />

    // <button onClick={()=>{
    //     axios.post("http://localhost:5000/users",{firstName,lastName,email,password}).then((result)=>{
    //         setDone(<div className="succes">the user has been added successfully</div>)
    //     }).catch((err)=>{
    //         setDone(<div className="wrong">error happen while regeister please try again</div>)
    //     })

    // }} >Register</button>
    // {done}
    // </div>
    )
}

export default Register