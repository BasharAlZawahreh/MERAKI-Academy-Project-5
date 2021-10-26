import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './slide.css'
const Slide=()=>{
    const car1="./images/car1.jpg"
    const car2="./images/car2.jpg"
    const car3="./images/car3.jpg"
    const car4="./images/car4.jpg"    
return <div className="slide" style={{"padding":"45px"}}>

    <Carousel showThumbs={false} showIndicators={false} dynamicHeight={true} showArrows={true} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img style={{ "height": "600px"}} src="https://www.hdcarwallpapers.com/walls/alfa_romeo_giulia_veloce_gt_junior_2021_4k-HD.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="https://www.hdcarwallpapers.com/walls/keyvany_bentley_continental_gt_convertible_5k-HD.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="https://www.hdcarwallpapers.com/walls/porsche_911_carrera_gts_2021_4k_4-HD.jpg" />
                </div>
                <div>
                    <img style={{ "height": "600px"}} src="https://www.hdcarwallpapers.com/walls/porsche_panamera_2021_5k_3-HD.jpg" />
                </div>
            </Carousel>
    </div>
}
export default Slide;