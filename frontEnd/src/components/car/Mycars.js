import React, { useEffect, useState } from "react";
import "./AddNewCar.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCar, updateCar, deleteCar } from "../../actions/cars/index";
import { useHistory } from "react-router";
import Table from "react-bootstrap/Table";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiCheckbox } from "react-icons/bi";
import Form from "react-bootstrap/Form";

const MyCars = () => {
  const history = useHistory();

  const state = useSelector((state) => {
    return { cars: state.car.cars, token: state.token.token };
  });
  console.log("state.car", state.cars);

  const dispatch = useDispatch();

  const git = () => {
    axios
      .get("http://localhost:5000/car/user", {
        headers: { authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        console.log("here", result.data.result);
        dispatch(setCar(result.data.result));
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const deleteCar1 = (car_id) => {
    console.log("delet", state.token);
    //,{headers:{authorization:`Bearer ${state.token}`}}
    axios
      .put(`http://localhost:5000/car/delete/${car_id}`)
      .then((result) => {
        dispatch(deleteCar(car_id));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const toggleCarAvailability = (id) => {
    axios
      .put(
        `http://localhost:5000/car/available/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((result) => {
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    git();
  }, []);

  console.log("state.cars", state.cars);

  return (
    <div style={{"padding":"30px"}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col" style={{ textAlign: "center" }}>
              Image
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Brand
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Model
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              manifactoring year
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              availability
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Description
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Price/Day
            </th>
            <th scope="col" style={{ textAlign: "center" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {state.cars.length &&
            state.cars.map((car, i) => {
              console.log("basharcar", car.is_Available);
              return (
                <tr key={i}>
                  <td class="w-25">
                    <img
                      src={car.main_img}
                      class="img-fluid img-thumbnail"
                      alt="Sheep"
                    />
                  </td>
                  <td>{car.brand}</td>
                  <td>{car.model}</td>
                  <td>{car.manifactoring_year}</td>
                  <td>
                    {car.is_Available === 0 ? (
                      <label style={{ marginTop: "20px" }} class="switch">
                        <input
                          type="checkbox"
                          onClick={() => {
                            toggleCarAvailability(car.car_id);
                          }}
                        />
                        <span class="slider round"></span>
                      </label>
                    ) : (
                      <label style={{ marginTop: "20px" }} class="switch">
                        <input
                          checked="true"
                          type="checkbox"
                          onClick={() => {
                            toggleCarAvailability(car.car_id);
                          }}
                        />
                        <span class="slider round"></span>
                      </label>
                    )}
                  </td>
                  <td>{car.description}</td>
                  <td>{car.day_price}JD</td>
                  <td>
                    <BiEditAlt
                      style={{
                        width: "50px",
                        height: "20px",
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => {
                        localStorage.setItem("car", JSON.stringify(car));
                        history.push(`/updateCar/${car.car_id}`);
                      }}
                    ></BiEditAlt>{" "}
                    <RiDeleteBin5Line
                      style={{
                        width: "50px",
                        height: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteCar1(car.car_id);
                      }}
                    ></RiDeleteBin5Line>{" "}
                  </td>

                  {/* //{available} */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
export default MyCars;
