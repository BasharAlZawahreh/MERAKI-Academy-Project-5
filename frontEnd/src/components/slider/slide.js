import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './slide.css'
const Slide=()=>{
    const car1="./images/car1.jpg"
    const car2="./images/car2.jpg"
    const car3="./images/car3.jpg"
    const car4="./images/car4.jpg"    
return <div className="slide" style={{"padding":"30px"}}>

    <Carousel showThumbs={false} showIndicators={false} showArrows={true} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img style={{ "height": "600px"}} src="./images/car1.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="./images/car2.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="./images/car3.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="./images/car4.jpg" />
                </div>
            </Carousel>
    </div>
}
export default Slide;