import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../actions/login";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { MdCancel } from "react-icons/md";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });

  const responsesuccessGoogle = (response) => {
    // console.log(response.profileObj);
    axios
      .post("/login/loginWithGoogle", {
        tokenId: response.tokenId,
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setMessage("");
          dispatch(setToken(res.data.token));
          localStorage.setItem("token", res.data.token);
          history.push("/");
        } else throw Error;
      })
      .catch((err) => {
        if (err.message) {
          setMessage("Error happened while Login, please try again");
          console.log(message);
        }
      });
  };
  const responseErrorGoogle = (response) => {
    setMessage("Error happened while Login, please try again");
    console.log(response);
  };

  const Enter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        console.log(res.data);
        dispatch(setToken(res.data.token));
        localStorage.setItem("token", res.data.token);
        history.push("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  useEffect(() => {
    if (!state.token) {
      dispatch(setToken(localStorage.getItem("token")));

      //   history.push("/slide");
    }
  }, [state.token]);

  return (
    <>
      <section className="sign-in">
        <div className="container">
          <span
            style={{ cursor: "pointer", marginLeft: "68.5rem" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <MdCancel
              style={{ height: "26px", width: "24px", paddingTop: "5px" }}
            />
          </span>
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src="images/signup-image.jpg" alt="sing up image" />
              </figure>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/register")}
                className="signup-image-link"
              >
                Create an account
              </a>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Login</h2>
              <form onSubmit={Enter} className="register-form" id="login-form">
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
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
                <div className="form-group">
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
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
                <div className="form-group form-button">
                  <button name="signin" id="signin" className="form-submit">
                    Login
                  </button>
                </div>
              </form>
              {message && <div>{message}</div>}

              <div className="social-login">
                <span className="social-label">Or login with</span>
                <ul className="socials">
                  <GoogleLogin
                    clientId="748391034640-pnejjmgso6e2r67atsbfddo71e8hfffv.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={(response) => responsesuccessGoogle(response)}
                    onFailure={(response) => responseErrorGoogle(response)}
                    cookiePolicy={"single_host_origin"}
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
