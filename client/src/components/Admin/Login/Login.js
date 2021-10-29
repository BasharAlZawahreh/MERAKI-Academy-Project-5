import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../actions/AdminActions/Login";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { MdCancel } from "react-icons/md";
import jwtDecode from "jwt-decode";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      adminToken: state.adminToken.adminToken,
    };
  });


  const Enter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/admin/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("Successfully logged in!");
        dispatch(setToken(res.data.token));
        localStorage.setItem("token", res.data.token);
        history.push("/admin/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  useEffect(() => {
    if (!state.token && localStorage.getItem("token")) {
      const isAdmin =
        jwtDecode(localStorage.getItem("token")).role === "SuperAdmin" ||
        jwtDecode(localStorage.getItem("token")).role === "Admin"
          ? true
          : false;

      if (isAdmin) {
        dispatch(setToken(localStorage.getItem("token")));
        history.push("/admin/dashboard");
      }
    }
  }, []);

  return (
    <>
      <section class="sign-in">
        <div class="container" >
          <span
            style={{ cursor: "pointer", marginLeft: "68.5rem" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <MdCancel
              style={{
                height: "26px",
                width: "24px",
                paddingTop: "5px",
                color: "white",
              }}
            />
          </span>
          <div class="signin-content" style={{backgroundColor: "rgb(43, 46, 74)"}}>
            <div class="signin-image">
              <figure>
                <img
                  src="https://thumbs.dreamstime.com/b/admin-message-working-office-table-background-93379017.jpg"
                  alt="sing up image"
                />
              </figure>
            </div>

            <div class="signin-form">
              <h2 class="form-title" style={{ color: "white" }}>
                Login
              </h2>
              <form onSubmit={Enter} class="register-form" id="login-form">
                <div class="form-group">
                  <label for="your_name">
                    <i class="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_name"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="your_name"
                    placeholder="Your Email"
                  />
                </div>
                <div class="form-group">
                  <label for="your_pass">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="your_pass"
                    placeholder="Password"
                  />
                </div>
                <div class="form-group form-button">
                  <button name="signin" id="signin" className="btn btn-primary btn-block mb-3"
                    style={{ height: "50px" }}>
                    Login
                  </button>
                </div>
              </form>
              {message && <div>{message}</div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
