import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reservations from "../Reservations/Reservations";
import Users from "../Users/Users";
import Cars from "../Cars/Cars";
import styles from "../Dashboard.module.css";
import { useHistory } from "react-router-dom";
import Statistics from "../Statistcs/Statistics";
const Dashboard = () => {
  const [component, setComponent] = useState("Statistics");
  const history = useHistory();
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logodetails}>
          {/* <i className='bx bxl-c-plus-plus'></i> */}
          <span className={styles.logo_name}>Auto Rental</span>
        </div>
        <ul className={styles.navlinks}>
          <li>
            <a onClick={()=>setComponent("cars")}>
              {/* <i className='bx bx-box' ></i> */}
              <span  className={styles.links_name}>Cars</span>
            </a>
          </li>
          <li>
            <a onClick={()=>setComponent("users")} >
              {/* <i className='bx bx-list-ul' ></i> */}
              <span className={styles.links_name}>Users</span>
            </a>
          </li>
          <li>
            <a onClick={()=>setComponent("reservations")}>
              {/* <i className='bx bx-pie-chart-alt-2' ></i> */}
              <span  className={styles.links_name}>Reservations</span>
            </a>
          </li>
          <li>
            <a onClick={()=>setComponent("Statistics")}>
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
              <Statistics />
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
