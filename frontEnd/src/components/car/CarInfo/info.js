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
    <div>
      {carView && (
        <Card
          style={{
            color: "white",
            width: "25rem",
            height: "400px",
            marginLeft: "700px",
            marginTop: "150px",
            backgroundColor: "#003638",
          }}
        >
          <Card.Img variant="top" src={carView.main_img} />
          <Card.Body>
            <Card.Title
              style={{
                textAlign: "center",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              <h2 style={{ color: "white" }}>{carView.brand}</h2>
              {carView.model}
            </Card.Title>

            <Rating
              style={{ paddingVertical: 10 }}
              ratingValue={rateAvg}
              size={30}
              label
              transition
              fillColor="orange"
              emptyColor="gray"
              className="foo" // Will remove the inline style if applied
            />
            <Card.Text>{carView.description}</Card.Text>
            <Button
              style={{ marginTop: "45px", marginLeft: "130px" }}
              variant="secondary"
              onClick={() => {
                dispatch(setSearchCarId(car_id))
                history.push(`/addRes`);
              }}
            >
              Book
            </Button>
          </Card.Body>
        </Card>
      )}

      {/*Map on imgs*/}
      <div>
        <h1>Car Images</h1>
        {carViews &&
          carViews.map((carImg, i) => {
            return <img key={i} variant="top" src={carView.imgUrl} alt={i} />;
          })}
      </div>

      {/*Map on rates and comments*/}
      <div>
        <h1>Car Rates</h1>
        {carRates &&
          carRates.map((rate, i) => {
            return (
              <div key={i}>
                <Rating
                  style={{ paddingVertical: 10 }}
                  ratingValue={rate.rate}
                  size={12}
                  label
                  transition
                  fillColor="orange"
                  emptyColor="gray"
                  className="foo" // Will remove the inline style if applied
                />
                <br />
                <textarea disabled value={rate.comment} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default CarInfo;
