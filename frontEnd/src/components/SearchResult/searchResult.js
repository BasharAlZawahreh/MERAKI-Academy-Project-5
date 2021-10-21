import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setSearchCarId } from "../../actions/search";
// import "./searchResult.css";
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
      <div classNameName="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <h1 className="display-4 text-uppercase text-center mb-5">Search Result</h1>
        <div className="row">
          {state.searches &&
            state.searches.map((car, i) => {
              return (
                <div key={i} className="col-lg-4 col-md-6 mb-2">
                  <div className="rent-item mb-4 omgs">
                    <img className="img-fluid mb-4" src={car.main_img} alt="" />
                    <h4 className="text-uppercase mb-4">{car.brand}</h4>
                    <div className="d-flex justify-content-center mb-4">
                      <div className="px-2">
                        <i className="fa fa-car text-primary mr-1"></i>
                        <span>{car.manifactoring_year}</span>
                      </div>
                      <div className="px-2">
                        <i className="fa fa-road text-primary mr-1"></i>
                        <span>{car.day_price}/Day</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        history.push(`/addRes/${car.car_id}`);
                        
                        // dispatch(setSearchCarId(car.car_id));
                      }}
                      className="btn btn-primary px-3"
                    >
                      Rent Now
                    </button>
                    <button
                      onClick={() => {
                        history.push(`/carinfo/${car.car_id}`);
                      }}
                      className="btn btn-primary px-3 mt-2"
                      // to={`/carinfo/${car.car_id}`}
                    >
                      Detailes
                    </button>
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
