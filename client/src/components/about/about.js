import React from "react";

function About() {
  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          
          <h1 className="display-4 text-uppercase text-center mb-5">
            Welcome To <span className="text-primary">Auto Rental Cars</span>
          </h1>
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <img
                className="w-75 mb-4"
                src="https://jpauc.jp/wp-content/uploads/2020/12/Lets-find-the-perfect-car-together.png"
                alt=""
              />
              <p>
              Cars are a very important means of transport in our time and divide into several sections, there are small private cars owned by people to go to work or move with the family, there are large buses used to transport passengers and trucks used to transport goods.
                   All of these categories you can rent now on our website asily
              </p>
              <p>
              It was founded in October 2021 by entrepreneur Meraki Academy with
            the support of Auto Rental team .
              </p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-light p-4 mb-4"
                style={{height:"150px"}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  
                  style={{height:"150px",width:"100px"}}
                >
                  <i className="fa fa-2x fa-headset text-secondary"></i>
                </div>
                <h4 className="text-uppercase m-0">24/7 Car Rental Support 000962777777</h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-secondary p-4 mb-4"
                style={{height:"150px"}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{height:"150px", width:"100px"}}
                >
                  <i className="fa fa-2x fa-car text-secondary"></i>
                </div>
                <h4 className="text-light text-uppercase m-0">
                  Car Reservation Anytime
                </h4>
              </div>
            </div>
            <div className="col-lg-4 mb-2">
              <div
                className="d-flex align-items-center bg-light p-4 mb-4"
                style={{height:"150px"}}
              >
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                  style={{height:"150px", width:"100px"}}
                >
                  <i className="fa fa-2x fa-map-marker-alt text-secondary"></i>
                </div>
                <h4 className="text-uppercase m-0">Lots Of Pickup Locations</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
