import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Reservations from "../Reservations/Reservations";
import Users from "../Users/Users";
import Cars from "../Cars/Cars";
import styles from "../Dashboard.module.css";
import { useHistory } from "react-router-dom";
import Statistics from "../Statistcs/Statistics";
import axios from "axios";
import { setCar, deleteCar } from "../../../actions/cars";
import { removeToken} from "../../../actions/AdminActions/Login";
import {
  setReservation,
  updateReservationConfirmation,
} from "../../../actions/reservations";
import { setUser, deleteUser, updateUser } from "../../../actions/users";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const [component, setComponent] = useState("Statistics");
  const [data, setData] = useState();
  const [notifications, setNotifications] = useState("");
  const [usersStatistics, setUsersStatistics] = useState("");
  const [carsStatistics, setCarsStatistics] = useState("");
  const [reservationsStatistics, setReservationsStatistics] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const state = useSelector((state) => {
    return {
      adminToken: state.adminToken.adminToken,
      reservations: state.reservation.reservations,
    };
  });

  let token = state.adminToken || localStorage.getItem("token");
  let arr;
  useEffect(() => {
    arr = JSON.parse(localStorage.getItem("reservations")) || [];
    arr.length ? setNotifications(arr.length) : setNotifications("");
  });

  const getAllUsers = async () => {
    const res = await axios.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setUser(res.data.result));
    setUsersStatistics(res.data.result.length);
  };

  const getAllCars = async () => {
    const res = await axios.get("/admin/cars", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setCar(res.data.result));
    setCarsStatistics(res.data.result.length);
  };

  const getAllReservations = async () => {
    const res = await axios.get("/admin/reserves", {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(setReservation(res.data.result));
    setReservationsStatistics(res.data.result.length);
  };

  useEffect(() => {
    getAllReservations();
    getAllCars();
    getAllUsers();
  }, []);

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logodetails}>
          {/* <i className='bx bxl-c-plus-plus'></i> */}
          <span className={styles.logo_name}>Auto Rental</span>
        </div>
        <ul className={styles.navlinks}>
          <li>
            <a onClick={() => setComponent("cars")}>
              {/* <i className='bx bx-box' ></i> */}
              <span className={styles.links_name}>Cars</span>
            </a>
          </li>
          <li>
            <a onClick={() => setComponent("users")}>
              {/* <i className='bx bx-list-ul' ></i> */}
              <span className={styles.links_name}>Users</span>
            </a>
          </li>
          <li>
            <a onClick={() => setComponent("reservations")}>
              {/* <i className='bx bx-pie-chart-alt-2' ></i> */}
              <span className={styles.links_name}>Reservations</span>
            </a>
          </li>
          <li>
            <a onClick={() => setComponent("Statistics")}>
              {/* <i className='bx bx-coin-stack' ></i> */}
              <span className={styles.links_name}>Statistics</span>
            </a>
          </li>
          <li className="log_out">
            <a>
              {/* <i className='bx bx-log-out'></i> */}
              <span
                onClick={
                  () => {
                    dispatch(removeToken("remove"))
                    localStorage.removeItem("token");
                    history.push("/admin/login");
                  }
                  // dispatch(setToken());
                }
                className={styles.links_name}
              >
                Log out
              </span>
            </a>
          </li>
        </ul>
      </div>

      <section className={styles.homesection}>
        <nav>
          <i
            className="fa fa-bell"
            onClick={() => {
              arr.length && localStorage.removeItem("reservations");
              setComponent("reservations");
            }}
          >
            <span>{notifications}</span>
          </i>
          {/* <div className={styles.sidebarbutton}> */}
          {/* <button onClick={() => setComponent("users")}>Users</button>
          </div>
          <div className={styles.sidebarbutton}>
            <button onClick={() => setComponent("cars")}>Cars</button>
          </div>
          <div className={styles.searchbox}></div>
          <div className={styles.sidebarbutton}>
            <button className="Ourbtn" onClick={() => setComponent("reservations")}>
              Reservations
            </button>
          </div>
          <div className={styles.sidebarbutton}>
            <button onClick={() => setComponent("Statistics")}>
              Statistics
            </button>
          </div>
          <div className="profile-details"></div> */}
        </nav>
        <div className={styles.homecontent}>
          <div className={styles.overviewboxes}>
            {component === "Statistics" ? (
              <Statistics
                usersStatistics={usersStatistics}
                carsStatistics={carsStatistics}
                reservationsStatistics={reservationsStatistics}
              />
            ) : component === "users" ? (
              <Users />
            ) : component === "cars" ? (
              <Cars />
            ) : component === "reservations" ? (
              <Reservations />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
