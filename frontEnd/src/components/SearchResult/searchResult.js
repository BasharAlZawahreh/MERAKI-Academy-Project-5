import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setSearchCarId } from "../../actions/search";
import "./searchResult.css";
function SearchResult() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      searches: state.searches.searches,
    };
  });

  return (
    <section class="services" id="services">
      <div class="heading">
        <h1>Search Result</h1>
      </div>
      <div class="services-container">
        {state.searches &&
          state.searches.map((car, i) => {
            return (
              <div key={i} class="box">
                <div class="box-img">
                  <img src={car.main_img} alt="" />
                </div>
                <p>{car.manifactoring_year}</p>
                <h3>{car.brand}</h3>
                <h2>
                  {car.day_price} <span>/month</span>
                </h2>
                <button
                  href="#"
                  id={car.car_id}
                  class="btn"
                  onClick={() =>{ 
                    history.push("/addRes")
                    dispatch(setSearchCarId(car.car_id))
                  }}
                  
                >
                  Rent Now
                </button>


                <button
                  href="#"
                  id={car.car_id}
                  class="btn"
                  onClick={() =>{ 
                    history.push(`/carinfo/${car.car_id}`)
                  
                  }}
                  
                >
                view
                </button>

              </div>
            );
          })}
      </div>
    </section>
  );
}

export default SearchResult;
