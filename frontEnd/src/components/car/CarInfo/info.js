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
import { setSearchCarId } from "../../../actions/search";

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

  console.log("car", carView);
  return (
    <>
      <div class="container-fluid pt-5">
        <div class="container pt-5">
          <div class="row">
            <div class="col-lg-6 mb-5">
              <h1 class="display-4 text-uppercase mb-5">{carView.brand}</h1>
              <div class="row mx-n2 mb-3">
                {carViews &&
                  carViews.map((carImg, i) => {
                    return (
                      <div class="col-md-4 col-6 px-2 pb-2">
                        <img
                          key={i}
                          variant="top"
                          src={carImg.imgUrl}
                          alt="car photo"
                          class="img-fluid w-100"
                        />
                      </div>
                    );
                  })}
              </div>
              <p>{carView.description}</p>
             
              <div class="row pt-2">
                <div class="col-md-3 col-6 mb-2">
                  <i class="fa fa-car text-primary mr-2"></i>
                  <span>{carView.manifactoring_year}</span>
                </div>
                <div class="col-md-3 col-6 mb-2">
                  <i class="fa fa-cogs text-primary mr-2"></i>
                  <span>Automatic</span>
                </div>
                <div class="col-md-3 col-6 mb-2">
                  <i class="fa fa-road text-primary mr-2"></i>
                  <span>20km/liter</span>
                </div>
              </div>
            </div>
            <div class="col-lg-6 mb-5">
                    <div class="bg-secondary p-5">
                        <h3 class="text-primary text-center mb-4"> <Rating
                style={{ paddingVertical: 10 }}
                ratingValue={rateAvg}
                size={30}
                label
                transition
                fillColor="orange"
                emptyColor="gray"
                className="foo" // Will remove the inline style if applied
              /></h3>
                          {carRates ?
          carRates.map((rate, i) => {
            return (
              <div class="form-group" key={i}>
              <div class="date" id="date1" data-target-input="nearest">
                  <input type="text" class="form-control p-4 datetimepicker-input" disabled={true} placeholder="Pickup Date"
                      data-target="#date1" data-toggle="datetimepicker" />
              </div>
          </div> 
            )
          }):                        <div class="form-group">
          <div class="time" id="time1" data-target-input="nearest">
              <input type="text" class="form-control p-4 datetimepicker-input" disabled={true} placeholder="No Comments till now"
                  data-target="#time1" data-toggle="datetimepicker" />
          </div>
      </div>}
                       
                        
                        
                        
                    </div>
                </div>
          </div>
        </div>
      </div>
    </>
  );

};
export default CarInfo;
