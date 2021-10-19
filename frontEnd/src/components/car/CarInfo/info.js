import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import * as moment from "moment";
import { setRate } from "../../../actions/Rate";
import { setCar } from "../../../actions/cars";
import { useHistory } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Button from "react-bootstrap/Button";
import {setSearchCarId} from '../../../actions/search'

const CarInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [carViews, setCarViews] = useState(""); //for imgs
  const [carView, setCarView] = useState(""); // for car it self
  const [carRates, setCarRates] = useState(""); // for rates
  const [rateAvg, setRateAvg] = useState(5); // for rate avg
  //   const state = useSelector((state) => {
  //     return { cars: state.car.cars
  //      };
  //   });

  let car_id = useParams().id;

  const avgRate = async (arr) => {
    let sum = await arr.reduce((acc, elem) => {
      return acc + elem.rate;
    }, 0);

    const rateavg = Math.floor(sum / arr.length);

    setRateAvg(rateavg);
  };

  const getCarInfo = async () => {
    await axios
      .get(`http://localhost:5000/car/car/${car_id}`)
      .then((result) => {
        setCarViews(result.data.result);
        setCarView(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRates = async () => {
    await axios
      .get(`http://localhost:5000/rate/${car_id}`)
      .then(async (result) => {
        if (result.data.result.length) {
          await avgRate(result.data.result);
          setCarRates(result.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCarInfo();
    getRates();
  }, []);
return (
  <>
  <div class="container-fluid pt-5">
        <div class="container pt-5">
            <div class="row">
                <div class="col-lg-8 mb-5">
                    <h1 class="display-4 text-uppercase mb-5">Mercedes Benz R3</h1>
                    <div class="row mx-n2 mb-3">
                        <div class="col-md-3 col-6 px-2 pb-2">
                            <img class="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/todo-328510.appspot.com/o/images%2FScreenshot_1.png?alt=media&token=f080c1da-9ff3-4b50-839d-c0f6bcd023b3" alt=""/>
                        </div>
                        <div class="col-md-3 col-6 px-2 pb-2">
                            <img class="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/todo-328510.appspot.com/o/images%2FScreenshot_1.png?alt=media&token=f080c1da-9ff3-4b50-839d-c0f6bcd023b3" alt=""/>
                        </div>
                        <div class="col-md-3 col-6 px-2 pb-2">
                            <img class="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/todo-328510.appspot.com/o/images%2FScreenshot_1.png?alt=media&token=f080c1da-9ff3-4b50-839d-c0f6bcd023b3" alt=""/>
                        </div>
                        <div class="col-md-3 col-6 px-2 pb-2">
                            <img class="img-fluid w-100" src="https://firebasestorage.googleapis.com/v0/b/todo-328510.appspot.com/o/images%2FScreenshot_1.png?alt=media&token=f080c1da-9ff3-4b50-839d-c0f6bcd023b3" alt=""/>
                        </div>
                    </div>
                    <p>Tempor erat elitr at rebum at at clita aliquyam consetetur. Diam dolor diam ipsum et, tempor voluptua sit consetetur sit. Aliquyam diam amet diam et eos sadipscing labore. Clita erat ipsum et lorem et sit, sed stet no labore lorem sit. Sanctus clita duo justo et tempor consetetur takimata eirmod, dolores takimata consetetur invidunt magna dolores aliquyam dolores dolore. Amet erat amet et magna</p>
                    <div class="row pt-2">
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-car text-primary mr-2"></i>
                            <span>Model: 2015</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-cogs text-primary mr-2"></i>
                            <span>Automatic</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-road text-primary mr-2"></i>
                            <span>20km/liter</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-eye text-primary mr-2"></i>
                            <span>GPS Navigation</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-car text-primary mr-2"></i>
                            <span>Model: 2015</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-cogs text-primary mr-2"></i>
                            <span>Automatic</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-road text-primary mr-2"></i>
                            <span>20km/liter</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-eye text-primary mr-2"></i>
                            <span>GPS Navigation</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-car text-primary mr-2"></i>
                            <span>Model: 2015</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-cogs text-primary mr-2"></i>
                            <span>Automatic</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-road text-primary mr-2"></i>
                            <span>20km/liter</span>
                        </div>
                        <div class="col-md-3 col-6 mb-2">
                            <i class="fa fa-eye text-primary mr-2"></i>
                            <span>GPS Navigation</span>
                        </div>
                    </div>
               </div>

                
            </div>
        </div>
    </div>
  </>
)
  // return (
  //   <div>
  //     {carView && (
  //       <Card
  //         style={{
  //           color: "white",
  //           width: "25rem",
  //           height: "400px",
  //           marginLeft: "700px",
  //           marginTop: "150px",
  //           backgroundColor: "#003638",
  //         }}
  //       >
  //         <Card.Img variant="top" src={carView.main_img} />
  //         <Card.Body>
  //           <Card.Title
  //             style={{
  //               textAlign: "center",
  //               fontWeight: "bold",
  //               marginTop: "10px",
  //             }}
  //           >
  //             <h2 style={{ color: "white" }}>{carView.brand}</h2>
  //             {carView.model}
  //           </Card.Title>

  //           <Rating
  //             style={{ paddingVertical: 10 }}
  //             ratingValue={rateAvg}
  //             size={30}
  //             label
  //             transition
  //             fillColor="orange"
  //             emptyColor="gray"
  //             className="foo" // Will remove the inline style if applied
  //           />
  //           <Card.Text>{carView.description}</Card.Text>
  //           <Button
  //             style={{ marginTop: "45px", marginLeft: "130px" }}
  //             variant="secondary"
  //             onClick={() => {
  //               dispatch(setSearchCarId(car_id))
  //               history.push(`/addRes`);
  //             }}
  //           >
  //             Book
  //           </Button>
  //         </Card.Body>
  //       </Card>
  //     )}

  //     {/*Map on imgs*/}
  //     <div>
  //       <h1>Car Images</h1>
  //       {carViews &&
  //         carViews.map((carImg, i) => {
  //           return <img key={i} variant="top" src={carImg.imgUrl} alt={i} />;
  //         })}
  //     </div>

  //     {/*Map on rates and comments*/}
  //     <div>
  //       <h1>Car Rates</h1>
  //       {carRates &&
  //         carRates.map((rate, i) => {
  //           return (
  //             <div key={i}>
  //               <Rating
  //                 style={{ paddingVertical: 10 }}
  //                 ratingValue={rate.rate}
  //                 size={12}
  //                 label
  //                 transition
  //                 fillColor="orange"
  //                 emptyColor="gray"
  //                 className="foo" // Will remove the inline style if applied
  //               />
  //               <br />
  //               <textarea disabled value={rate.comment} />
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </div>
  // );
};
export default CarInfo;
