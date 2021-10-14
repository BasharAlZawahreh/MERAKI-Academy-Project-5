import React from "react";
import BackgroundSlider from "react-background-slider";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../actions/login";
import { Link } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.token.token,
    };
  });

  return (
    <>
      {!state.token ? (
        <div class="header">
          <Link style={{ textDecoration: "none" }} href="#" class="logo">
            <img src="./images/logo.png" alt="" />
          </Link>
          <div class="bx bx-menu" id="menu-icon"></div>
          <ul style={{ "list-style-type": "none" }} class="navbar">
            <li>
              <Link style={{ textDecoration: "none" }} href="index.html">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="about.html">
                About
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="#reviews">
                Contact
              </Link>
            </li>
          </ul>
          <div class="header-btn1">
            <Link
              style={{ textDecoration: "none" }}
              href="#"
              class="sign-in"
              data-toggle="modal"
              data-target="#modalLRForm"
            >
              LogIn
            </Link>
          </div>
        </div>
      ) : (
        <div class="header">
          <Link style={{ textDecoration: "none" }} href="#" class="logo">
            <img src="./images/logo.png" alt="" />
          </Link>
          <div class="bx bx-menu" id="menu-icon"></div>

          <ul style={{ "list-style-type": "none" }} class="navbar">
            <li>
              <Link style={{ textDecoration: "none" }} href="index.html">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="#ride">
                My Reservation
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="#services">
                My Cars
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="about.html">
                About
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none" }} href="#reviews">
                Contact
              </Link>
            </li>
          </ul>
          <div class="header-btn1">
            <button
              class="sign-in"
              onClick={() => {
                localStorage.clear();
                dispatch(setToken(""));
                //       Appcontext.setToken("");
                // history.push("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
