import { createRef } from "react";

const initialState = {
  cars: [],
};
const car = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_CAR":
      return { cars: [...state.cars, payload] };

    case "SET_CAR":
      return { cars: payload };

    case "UPDATE_CAR":
      console.log("pay",payload);
      let car = state.cars.find((elem)=>{
        return elem.car_id===payload
      })
      console.log( car.is_Available);
      console.log(car.is_Deleted);
      let av = car.is_Available
      if(av==1){
        car.is_Available=0
      }else if(av==0){
        car.is_Available=1
      }

      console.log(car);
      return {
        cars: state.cars.map((elem) => {
          console.log(elem.car_id);
          
          return elem.car_id === payload ? elem=car : elem=elem;
        }),
        
      };
    case "DELETE_CAR":
      return {
        cars: state.cars.filter((elem) => {
          return elem.car_id !== payload;
        }),
      };
    default:
      return state;
  }
};

export default car;
