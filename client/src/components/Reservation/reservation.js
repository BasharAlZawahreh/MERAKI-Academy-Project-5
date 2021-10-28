import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReservation, updateReservation } from "../../actions/reservations";
import { useHistory, useParams } from "react-router";
import { jsx } from "@emotion/react";
import * as moment from "moment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GiCancel } from "react-icons/gi";
import Payment from "../Payment/payment";
import styled from "styled-components";
import WeatherComponent from "./WeatherInfoComponent";
// import "./reservation.css";

export const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;
const AddReservation = () => {
  const [showButton, setShowButton] = useState(false);
  const [weather, updateWeather] = useState();

  const history = useHistory();
  const dispatch = useDispatch();
  const [returnDate, setReturnDate] = useState("");
  const [PickUpDate, setPickUpDate] = useState("");
  const [amount, setAmount] = useState();
  const [users_id, setUsers_id] = useState();
  const [isOk, setIsOk] = useState(true);
  const car_id = useParams().id;
  //  const[car_id,setCar_id]=useState("2")
  //   const [price, setPrice] = useState();

  const state = useSelector((state) => {
    return {
      token: state.token.token,
      reservations: state.reservation.reservations,
      car_Id: state.searches.car_Id,
      editOrInsert: state.reservation.editOrInsert,
      reservation: state.reservation.farhan,
    };
  });

  let newvalue = JSON.parse(localStorage.getItem("elem"));

  const fetchWeather = async () => {
    // e.preventDefault();
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=jordan&appid=c12e81c0116820c36f0258aeb295a9f6`
    );
    updateWeather(response.data);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getStatus = async () => {
    try {
      await axios
        .get("/reserve/user/check", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((result) => {
          console.log(result.data.status);
          setIsOk(result.data.status);
        })
        .catch((err) => {
          console.log("status", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updatebooking = async (car_id) => {
    // let data={ returnDate=newvalue.returnDate, PickUpDate=newvalue.returnDate, amount, car_id }
    try {
      let price = newvalue.day_price;
      let difference =
        new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
      let days = Math.ceil(difference / (1000 * 3600 * 24));
      setAmount(days * price);
      // calc();
      // console.log("pick", PickUpDate);
      // console.log("return", returnDate);
      // console.log("id", car_id);
      // console.log("amount", amount);
      await axios
        .post(
          "/reserve",
          { returnDate, PickUpDate, amount, car_id },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        )
        .then((result) => {
          dispatch(addReservation(result.data.Reservations));
        })
        .catch((err) => {
          console.log("reserveErr", err);
        });
    } catch (error) {
      console.log("catch", error);
    }
  };

  const setAmount1 = ({ PickUpDate, returnDate, price }) => {
    return new Promise((resolve, reject) => {
      let difference =
        new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
      let days = Math.ceil(difference / (1000 * 3600 * 24));
      let cash = days * price;
      resolve(cash);
      if (PickUpDate > returnDate) {
        reject("Pick Up Date can not be after the return date ");
      }
    });
  };
  const booking = async () => {
    try {
      await axios
        .get(`/car/car/${car_id}`)
        .then(async (result) => {
          let price = result.data.result[0].day_price;
          let cash = await setAmount1({ PickUpDate, returnDate, price });
          setAmount(cash);
          setShowButton(true);
          return cash;
        })
        .then((amount) => {
          console.log("amount", amount);
          axios
            .post(
              "/reserve",
              { returnDate, PickUpDate, amount, car_id },
              {
                headers: { Authorization: `Bearer ${state.token}` },
              }
            )
            .then((result) => {
              console.log(result.data);
              dispatch(addReservation(result.data.Reservations));
            })
            .catch((err) => {
              console.log("reserveErr", err);
            });
        })
        .catch((err) => {
          console.log("priceErr", err);
        });
    } catch (error) {
      console.log("catchPrice", error);
    }
  };
  useEffect(() => {
    getStatus();
  }, []);
  return (
    <>
      {!state.token ? (
        history.push("/login")
      ) : !state.editOrInsert && isOk ? (
        <>
          <div className="container-fluid py-5 " >
            <div className="container pt-5 pb-3" style={{ display: "flex" ,flexDirection:"row"}}>
              

                <Container>
                  <h1>Weather Today</h1>
                  {/* <AppLabel>React Weather App</AppLabel> */}
                  {true && true ? (
                    <WeatherComponent weather={weather} city={"jordan"} />
                  ) : (
                    // <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
                    ""
                  )}
                </Container>
                <Card
                  style={{
                    flexDirection: "column",

                    alignItems: "center",
                    color: "white",
                    width: "50rem",

                    height: "400px",
                    // marginLeft: "25%",
                    // marginTop: "150px",
                    backgroundColor: "#2B2E4A",
                  }}
                >
                  <span
                    style={{ cursor: "pointer", alignSelf: "flex-end" }}
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    <GiCancel
                      style={{ color: "white", width: "18px", height: "20px" }}
                    />
                  </span>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      style={{
                        width: "30%",
                        alignItems: "center",
                        marginBottom: "34px",
                        marginLeft: "13px",
                        marginTop: "30px",
                        height: "73%",
                      }}
                      src="https://thumbs.dreamstime.com/b/car-rent-sale-agent-auto-dealer-leasing-concept-104364904.jpg"
                      class="card-img-top"
                      alt="..."
                    />

                    <Card.Body>
                      <Card.Title
                        style={{
                          textAlign: "center",

                          fontWeight: "bold",
                          marginTop: "20px",
                          marginBottom: "20px",
                          color: "white",
                        }}
                      >
                        Reservation
                      </Card.Title>
                      <Card.Text>
                        <input
                          // style={{ marginTop: "40px" }}
                          type="date"
                          placeholder="returnDate"
                          onChange={(e) => setReturnDate(e.target.value)}
                        />

                        <input
                          style={{ marginTop: "40px" }}
                          type="date"
                          placeholder="PickUpDate"
                          onChange={(e) => setPickUpDate(e.target.value)}
                        />
                        <input
                          style={{ marginTop: "30px", color: "white" }}
                          type="number"
                          disabled
                          value={`${amount}`}
                          placeholder="amount"
                        />
                      </Card.Text>
                      {showButton && <Payment amount={amount} />}
                      {!showButton && (
                        <Button
                          style={{ marginTop: "10%" }}
                          // className="btn btn-secondary"
                          // variant="secondary"
                          onClick={() => {
                            booking();
                          }}
                        >
                          Reservation
                        </Button>
                      )}
                    </Card.Body>
                  </div>
                </Card>
              
            </div>
          </div>
        </>
      ) : !isOk && !state.editOrInsert ? (
        history.push("/editprofile")
      ) : !isOk && state.editOrInsert ? (
        <div className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <Card
              style={{
                flexDirection: "column",

                alignItems: "center",
                color: "white",
                width: "50rem",
                marginLeft: "10vw",
                height: "400px",
                // marginLeft: "25%",
                // marginTop: "150px",
                backgroundColor: "#2B2E4A",
              }}
            >
              <span
                style={{ marginLeft: "23.5rem", cursor: "pointer" }}
                onClick={() => {
                  history.push("/myres");
                }}
              >
                <GiCancel
                  style={{ color: "white", width: "18px", height: "20px" }}
                />
              </span>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  style={{
                    width: "30%",
                    alignItems: "center",
                    marginBottom: "34px",
                    marginLeft: "13px",
                    marginTop: "30px",
                    height: "73%",
                  }}
                  src="https://previews.123rf.com/images/ostapenko/ostapenko1806/ostapenko180600197/104370985-isometric-renting-a-new-or-used-car-car-rental-booking-reservation-banner-vector-illustration-backgr.jpg"
                  class="card-img-top"
                  alt="..."
                />
                <Card.Body>
                  <Card.Title
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Reservation
                  </Card.Title>
                  <Card.Text>
                    <input
                      style={{ marginTop: "30px" }}
                      type="date"
                      placeholder="returnDate"
                      defaultValue={moment(
                        new Date(newvalue.returnDate)
                      ).format("YYYY-MM-DD")}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />

                    <input
                      style={{ marginTop: "30px" }}
                      type="date"
                      placeholder="PickUpDate"
                      defaultValue={moment(
                        new Date(newvalue.PickUpDate)
                      ).format("YYYY-MM-DD")}
                      onChange={(e) => setPickUpDate(e.target.value)}
                    />
                    <input
                      style={{ marginTop: "30px", color: "white" }}
                      type="number"
                      disabled
                      value={`${newvalue.amount}`}
                      placeholder="amount"
                    />
                  </Card.Text>
                  <Button
                    style={{ marginTop: "35px", marginLeft: "100px" }}
                    variant="secondary"
                    onClick={() => {
                      updatebooking(newvalue.car_id);
                    }}
                  >
                    Update
                  </Button>
                </Card.Body>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddReservation;
