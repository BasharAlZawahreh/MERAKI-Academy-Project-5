import React from "react";
import Slide from "../slider/slide";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./home.css";
import { useHistory } from "react-router-dom";

const Home = () => {
 
    const history = useHistory()
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0);

  const gitAllCars = async () => {
    const res = await axios.get("/car/cars");
    const data = res.data.result;
    const slice = data.slice(offset, offset + perPage);
    
    const postData = slice.map((car, i) => {
      let carMode = i % 2 === 0 ? "Auto" : "Manual"
      console.log(car,"odai");
      return (
        <div className="col-lg-4 col-md-6 mb-2 omgs">
          <div className="rent-item mb-4" key={i}>
           
            <img className="img-fluid mb-4 " src={car.main_img} alt="car img" />
            <h4 className="text-uppercase mb-4">{car.brand}</h4>
            <div className="d-flex justify-content-center mb-4">
              <div className="px-2">
                <i className="fa fa-car text-primary mr-1"></i>
                <span>{car.manifactoring_year}</span>
              </div>
              <div className="px-2 border-left border-right">
                <i className="fa fa-cogs text-primary mr-1"></i>
                <span>{carMode}</span>
              </div>
              <div className="px-2">
                <i className="fas fa-money-bill-alt text-primary mr-1 "></i>
                <span >{car.day_price}JD/D</span>
              </div>
            </div>
  
            <button className="btn btn-primary px-3 "
              onClick={() => {
                 history.push(`/addRes/${car.car_id}`);
                // dispatch(setSearchCarId(car.car_id));
              }}
              
            >
              Rent Now
            </button>
            <button  className="btn btn-primary px-3 mt-2"
              onClick={() => {
                history.push(`/carinfo/${car.car_id}`);
              }}
             
              // to={`/carinfo/${car.car_id}`}
            >
              Detailes
            </button>
          </div>
        </div>
      );
    });
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };
  useEffect(() => {
    gitAllCars();
  }, [offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };
  return (
    <>
      <Slide />
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            Find Your Car
          </h1>
          <div className="row">
            {/* <div className="col-lg-4 col-md-6 mb-2"> */}
            {data}
            </div>
          </div>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
        
      </div>
    </>
  );
};

export default Home;
