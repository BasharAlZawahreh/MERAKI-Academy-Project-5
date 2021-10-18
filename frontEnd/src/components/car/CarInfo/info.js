import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setRate } from "../../../actions/Rate";
import { useParams } from "react-router";
import Card from "react-bootstrap/Card";
import * as moment from "moment";
import { setCar } from "../../../actions/cars";
import { useHistory } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Button from "react-bootstrap/Button";
const CarInfo = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [carViews, setCarViews] = useState("");
  const [carView, setCarView] = useState("");
  const [carRate, setCarRates] = useState("");
  //   const state = useSelector((state) => {
  //     return { cars: state.car.cars
  //      };
  //   });

  let car_id = useParams().id;
  let rateavg;

  const avgRate = (arr) => {
    let sum = arr.reduce((acc, elem) => {
      return acc + elem.rate;
    }, 0);
    rateavg = Math.floor(sum / arr.length);
    console.log(rateavg);
  };

  const getCarInfo = () => {
    axios
      .get(`http://localhost:5000/car/car/${car_id}`)
      .then((result) => {
        console.log(result);
       
        setCarViews(result.data.result);
        setCarView(result.data.result[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getRates=()=>{
    axios
    .get(`http://localhost:5000/rate/${car_id}`)
    .then(async(result) => {
      console.log(result);
     await avgRate(result.data.result);
      setCarRates(result.data.result)
    })
    .catch((err) => {
      console.log(err);
    });
  }
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
              Car Info
            </Card.Title>

            <Card.Text> <Rating
    style={{ paddingVertical: 10 }}
        
    
       ratingValue={avgRate}
        size={30}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo" // Will remove the inline style if applied
      /> </Card.Text>
            <Button
              style={{ marginTop: "45px", marginLeft: "130px" }}
              variant="secondary"
              onClick={() => {
                history.push("/addRes");
              }}
            >
              Book
            </Button>
          </Card.Body>
        </Card>
      )}
      {/* 
   {
       carView.map((elem,i)=>{
          
         })} */}
    </div>
  );
};
export default CarInfo;
