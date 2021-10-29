// import React from "react";
// import styled from "styled-components";
// import {WeatherIcons} from './reservation';

// export const WeatherInfoIcons = {
//     sunset: "/icons/temp.svg",
//     sunrise: "/icons/temp.svg",
//     humidity: "/icons/humidity.svg",
//     wind: "/icons/wind.svg",
//     pressure: "/icons/pressure.svg",
// };
// const Location = styled.span`
//   margin: 15px auto;
//   text-transform: capitalize;
//   font-size: 28px;
//   font-weight: bold;
// `;
// const Condition = styled.span`
//   margin: 20px auto;
//   text-transform: capitalize;
//   font-size: 14px;
//   & span {
//     font-size: 28px;
//   }
// `;
// const WeatherInfoLabel = styled.span`
//   margin: 20px 25px 10px;
//   text-transform: capitalize;
//   text-align: start;
//   width: 90%;
//   font-weight: bold;
//   font-size: 14px;
// `;
// const WeatherIcon = styled.img`
//   width: 100px;
//   height: 100px;
//   margin: 5px auto;
// `;
// const WeatherContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin: 30px auto;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const WeatherInfoContainer = styled.div`
//   display: flex;
//   width: 90%;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
//   flex-wrap: wrap;
// `;
// const InfoContainer = styled.div`
//   display: flex;
//   margin: 5px 10px;
//   flex-direction: row;
//   justify-content: space-evenly;
//   align-items: center;
// `;
// const InfoIcon = styled.img`
//   width: 36px;
//   height: 36px;
// `;
// const InfoLabel = styled.span`
//   display: flex;
//   flex-direction: column;
//   font-size: 14px;
//   margin: 15px;
//   & span {
//     font-size: 12px;
//     text-transform: capitalize;
//   }
// `;

// const WeatherInfoComponent = (props) => {
//     const {name, value} = props;
//     return (
//         <InfoContainer>
//             <InfoIcon src={WeatherInfoIcons[name]}/>
//             <InfoLabel>
//                 {value}
//                 <span>{name}</span>
//             </InfoLabel>
//         </InfoContainer>
//     );
// };
// const WeatherComponent = (props) => {
//     const {weather} = props;
//     const isDay = weather?.weather[0].icon?.includes('d')
//     const getTime = (timeStamp) => {
//         return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
//     }
//     return (
//         <>
//             <WeatherContainer>
//                 <Condition>
//                     <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
//                     {`  |  ${weather?.weather[0].description}`}
//                 </Condition>
//                 <WeatherIcon src={WeatherIcons[weather?.weather[0].icon]}/>
//             </WeatherContainer>
//             <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>

//             <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
//             <WeatherInfoContainer>
//                 <WeatherInfoComponent name={isDay ? "sunset" : "sunrise"}
//                                       value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}/>
//                 <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity}/>
//                 <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed}/>
//                 <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure}/>
//             </WeatherInfoContainer>
//         </>
//     );
// };

// export default WeatherComponent;

import React, { useState } from "react";
import axios from "axios";
import "../Reservation/weather.css";

import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { FaMapPin } from "react-icons/fa";
import { GiPlanePilot } from "react-icons/gi";

function  WeatherComponent() {
  const [icon, setIcon] = useState();
  const [description, setDescription] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");

  const [name, setName] = useState("");
  if (!name) {
    axios
       .get(
        `http://api.openweathermap.org/data/2.5/weather?q=jordan&appid=c12e81c0116820c36f0258aeb295a9f6&lang=en`
      )
      .then((result) => {
        setIcon(result.data.weather[0].icon);
        setDescription(result.data.weather[0].description);
        setTemperature(result.data.main.temp);
        setHumidity(result.data.main.humidity);
        setWind(result.data.wind.speed);

        setName(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const changeHandler = (e) => {

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=fe5020d8dbf399a7c40ed4cd37fb5c74&lang=en`
      )
      .then((result) => {
        setIcon(result.data.weather[0].icon);
        setDescription(result.data.weather[0].description);
        setTemperature(result.data.main.temp);
        setWind(result.data.wind.speed);
        setHumidity(result.data.main.humidity);

        setName(result.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="weather_div">
        <center>
      <h1 style={{ fontSize: "20px" }}>
        <span style={{ color: "#F77D0A" }}>AUTO RENTAL</span>
        {/* <span style={{ color: "rgb(252,158,21)" }}>to</span>
       
        <span style={{ color: "rgb(227,64,61)" }}>rental</span> */}
      </h1>
      </center>
      <p style={{marginTop:"10px"}}>Weather</p>
{/*      
      <select className="weather_select" onChange={changeHandler}>
        <option> -- jordan --</option> */}

        {/* {data_1 
       .map((elem, i) => {
          return <option key={i}>{elem}</option>;
        })} */}
      {/* </select> */}
      <div className="weather_details">
        <p style={{ color: "white" }} >
          {name} <FaMapPin />
        </p>
        <h1 style={{ color: "#FDFAF6" }}>{description}</h1>

        <div className="weather_img" >
          {description && (
            <img src={`https://openweathermap.org/img/wn/${icon}@4x.png`}></img>
          )}
        </div>
      </div>

      <div className="weather_item">
        <div className="weather_item_sub" style={{ color: "rgb(19,145,210)" }}>
          <WiThermometer size={40} color="ffff" />

          <h1 className="weather_temp" style={{color:"#fff"}} >{`${temperature} °F`}</h1>

          <div
            className="weather_item_sub"
            style={{ color: "rgb(252,154,31)" }}
          >
            <WiHumidity size={40} color="ffff" />
            <h1  style={{color:"#fff"}}>{humidity}%</h1>
          </div>
          <div className="weather_item_sub" style={{ color: "rgb(227,64,61)" }}>
            <WiStrongWind size={40} color="ffff" />
            <h1 style={{color:"#fff"}}>{wind} m/s</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherComponent;

