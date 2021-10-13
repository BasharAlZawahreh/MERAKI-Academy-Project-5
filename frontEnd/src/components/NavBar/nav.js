import React from "react";
import BackgroundSlider from 'react-background-slider'
import {
    Link
  } from "react-router-dom";
import './nav.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Nav=()=>{
    const car1="./images/car1.jpg"
    const car2="./images/car2.jpg"
    const car3="./images/car3.jpg"
    const car4="./images/car4.jpg"
    return(
        <>
    <div class="header">
      <Link style={{ "textDecoration": 'none'}} href="#" class="logo"><img src="./images/logo.png" alt="" /></Link>

      <div class="bx bx-menu" id="menu-icon"></div>
{/* list-style-type: none;
 */}

      <ul style={{"list-style-type":"none"}} class="navbar" >
        <li ><Link style={{ "textDecoration": 'none'}}   href="index.html">Home</Link></li>
        <li><Link style={{ "textDecoration": 'none'}} href="#ride">My Reservation</Link></li>
        <li><Link style={{ "textDecoration": 'none'}} href="#services">My Cars</Link></li>
        <li><Link style={{ "textDecoration": 'none'}} href="about.html">About</Link></li>
        <li><Link style={{ "textDecoration": 'none'}} href="#reviews">Contact</Link></li>
      </ul>
      <div class="header-btn1">
        <Link
        style={{ "textDecoration": 'none'}}
          href="#"
          class="sign-in"
          data-toggle="modal"
          data-target="#modalLRForm"
          >LogIn</Link
        >
      </div>
    </div>
        </>
    )
}


export default Nav;