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
    <>
      <div class="container-fluid py-5">
      <div class="container pt-5 pb-3">
        <h1 class="display-4 text-uppercase text-center mb-5">Search Result</h1>
        <div class="row">
          {state.searches &&
            state.searches.map((car, i) => {
              return (
                <div key={i} class="col-lg-4 col-md-6 mb-2">
                  <div class="rent-item mb-4">
                    <img class="img-fluid mb-4" src={car.main_img} alt="" />
                    <h4 class="text-uppercase mb-4">{car.brand}</h4>
                    <div class="d-flex justify-content-center mb-4">
                      <div class="px-2">
                        <i class="fa fa-car text-primary mr-1"></i>
                        <span>{car.manifactoring_year}</span>
                      </div>
                      <div class="px-2">
                        <i class="fa fa-road text-primary mr-1"></i>
                        <span>{car.day_price}/Day</span>
                      </div>
                    </div>
                    <a
                      onClick={() => {
                        history.push("/addRes");
                        dispatch(setSearchCarId(car.car_id));
                      }}
                      class="btn btn-primary px-3"
                      href=""
                    >
                      Rent Now
                    </a>
                    <a
                      onClick={() => {
                        history.push(`/carinfo/${car.car_id}`);
                      }}
                      class="btn btn-primary px-3"
                      href=""
                    >
                      Detiles
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      </div>
    </>
  );
}

export default SearchResult;
