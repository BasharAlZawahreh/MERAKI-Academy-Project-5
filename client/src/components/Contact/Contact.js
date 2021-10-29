import React from "react";
import emailjs from "emailjs-com";
import swal from "sweetalert";

function Contact() {
  const sendEmail = (e) => {
    console.log("working");
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_jzwlu6m",
        e.target,
        "user_OM0LjSxw6YbJuM14pCm2f"
      )
      .then(
        (result) => {
          console.log(result.text);
          swal(
            "Thank you for youre messgae",
            "Auto_Rental team will contact with you as soon as",
            "success"
          );
        },
        (error) => {
          console.log("err", error);
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Contact Us
          </h1>
          <div className="row">
            <div className="col-lg-7 mb-2">
              <div
                className="contact-form bg-light mb-4"
                style={{ padding: "40px" }}
              >
                <form onSubmit={sendEmail}>
                  <div className="row">
                    <div className="col-6 form-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        placeholder="Your Name"
                        required="required"
                        name="from_name"
                      />
                    </div>
                    <div className="col-6 form-group">
                      <input
                        type="email"
                        className="form-control p-4"
                        placeholder="Your Email"
                        required="required"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      placeholder="Subject"
                      required="required"
                      name="subject"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control py-3 px-4"
                      rows="5"
                      placeholder="Message"
                      required="required"
                      name="message"
                    ></textarea>
                  </div>
                  <div>
                    <center>
                      <button
                        className="btn btn-primary btn-block mb-3"
                    
                        style={{
                          width: "130px",
                          marginTop: "5PX",
                          height: "38px",
                        }}
                        type="submit"
                      >
                        Send 
                      </button>
                    </center>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 mb-2">
              <div
                className="bg-secondary d-flex flex-column justify-content-center px-5 mb-4"
                style={{ height: "435px" }}
              >
                <div className="d-flex mb-3">
                  <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3"></i>
                  <div className="mt-n1">
                    <h5 className="text-light">Head Office</h5>
                    <p>Jordan-Amman-Business Bark</p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3"></i>
                  <div className="mt-n1">
                    <h5 className="text-light">Branch Office</h5>
                    <p>Jordan-Irbid</p>
                  </div>
                </div>
                <div className="d-flex mb-3">
                  <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                  <div className="mt-n1">
                    <h5 className="text-light">Customer Service</h5>
                    <p>customer@Auto_Rental.Jo</p>
                  </div>
                </div>
                <div className="d-flex">
                  <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3"></i>
                  <div className="mt-n1">
                    <h5 className="text-light">Return & Refund</h5>
                    <p className="m-0">refund@Auto_Rental.Jo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
