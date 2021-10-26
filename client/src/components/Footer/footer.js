import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  });

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className="container-fluid bg-secondary py-5 px-sm-3 px-md-5"
        style={{ marginTop: "90px" }}
      >
        <div className="row pt-5">
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Get In Touch</h4>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-white mr-3"></i>
              Jordan-Amman
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt text-white mr-3"></i>0096277777
            </p>
            <p>
              <i className="fa fa-envelope text-white mr-3"></i>info@Auto_Rental
            </p>
            <h6 className="text-uppercase text-white py-2">Follow Us</h6>
            <div className="d-flex justify-content-start">
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square mr-2" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-lg btn-dark btn-lg-square" href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Usefull Links</h4>
            <div className="d-flex flex-column justify-content-start">
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Private
                Policy
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Term &
                Conditions
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>New Member
                Registration
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Affiliate
                Programme
              </a>
              <a className="text-body mb-2" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>
                <Link  style={{color:"#8486AD"}}   to="/admin/login">Admin</Link>
              </a>
              <a className="text-body" href="#">
                <i className="fa fa-angle-right text-white mr-2"></i>Help & FQAs
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Car Gallery</h4>
            <div className="row mx-n1">
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1567818735868-e71b99932e29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1619405399517-d7fce0f13302?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1610399214658-52b9fdea4627?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1616422285623-13ff0162193c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=431&q=80"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1605515121761-e2bb7b5e3744?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=406&q=80"
                    alt=""
                  />
                </a>
              </div>
              <div className="col-4 px-1 mb-2">
                <a href="">
                  <img
                    className="w-100 h-100"
                    src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-5">
            <h4 className="text-uppercase text-light mb-4">Newsletter</h4>
            <p className="mb-4">
              Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem
              lorem sit sed elitr sed kasd et
            </p>
            <div className="w-100 mb-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control bg-dark border-dark"
                  style={{ padding: "25px" }}
                  placeholder="Your Email"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary text-uppercase px-3">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark py-4 px-sm-3 px-md-5">
        <p className="mb-2 text-center text-body">
          &copy; <a href="#">Auto_Rental</a>. All Rights Reserved.
        </p>
        <p className="m-0 text-center text-body">
          Designed by{" "}
          <a href="https://htmlcodex.com">Auto Team "MERAKI_ACADIMY"</a>
        </p>
      </div>
      {/* {showButton && (
    <a  onClick={scrollToTop} class="btn btn-lg btn-primary btn-lg-square back-to-top"><i class="fa fa-angle-double-up"></i></a>
    )} */}
      {showButton && (
        <button
          style={{ height: "50px", width: "50px", background: "#F77D0A" }}
          onClick={scrollToTop}
          className="btn btn-sm  back-to-top2"
        >
          <i class="fa fa-angle-double-up"></i>
        </button>
      )}
    </>
  );
};

export default Footer;
