import React, { Component } from "react";
import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
export default class Responsive extends Component {
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 4,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div>
        <Slider {...settings}>
          <div>
          <img style={{width:"150px"}} src="brands/byd.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/bmw.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/jeep.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/mazda.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/mini.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/jeep2.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/toyota.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/vw.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/citroen.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/dacia.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/buick.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/cadillac.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/chery.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/chevy.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/chrysler.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/bentley.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/bugatti.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/buick.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/acura.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/alfa_romeo.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/aston_martin.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/audi.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/nissan.png"></img>
          </div>
          <div>
          <img style={{width:"150px"}} src="brands/opel.png"></img>
          </div>
        </Slider>
      </div>
    );
  }
}