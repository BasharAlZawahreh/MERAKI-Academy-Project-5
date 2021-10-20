import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reservations from "../Reservations/Reservations";
import Users from "../Users/Users";
import Cars from "../Cars/Cars";
import styles from "./Dashboard.module.css";
import { useHistory } from "react-router-dom";
const Dashboard = () => {
  const [component, setComponent] = useState("users");
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
            <a href="#" className={styles.active}>
              {/* <i className='bx bx-grid-alt' ></i> */}
              <span className={styles.links_name}>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-box' ></i> */}
              <span className={styles.links_name}>Cars</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-list-ul' ></i> */}
              <span className={styles.links_name}>Users</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-pie-chart-alt-2' ></i> */}
              <span className={styles.links_name}>Reservations</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-coin-stack' ></i> */}
              <span className={styles.links_name}>Admins</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-book-alt' ></i> */}
              <span className={styles.links_name}>Total Cars</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-user' ></i> */}
              <span className={styles.links_name}>Team</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-message' ></i> */}
              <span className={styles.links_name}>Messages</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-heart' ></i> */}
              <span className={styles.links_name}>Favrorites</span>
            </a>
          </li>
          <li>
            <a href="#">
              {/* <i className='bx bx-cog' ></i> */}
              <span className={styles.links_name}>Setting</span>
            </a>
          </li>
          <li className="log_out">
            <a href="#">
              {/* <i className='bx bx-log-out'></i> */}
              <span onClick={()=>{
                localStorage.removeItem("token")
                history.push("/admin/login");

              }
                // dispatch(setToken());
                } className={styles.links_name}>Log out</span>
            </a>
          </li>
        </ul>
      </div>

      <section className={styles.homesection}>
        <nav>
          <div className={styles.sidebarbutton}>
            {/* <i className='bx bx-menu sidebarBtn'></i> */}
            <span className={styles.dashboard}>Dashboard</span>
          </div>
          <div className={styles.searchbox}>
            {/* <input type="text" placeholder="Search..."/> */}
            {/* <i className='bx bx-search' ></i> */}
          </div>
          <div className="profile-details">
            <button onClick={()=>setComponent("users")}>Users</button>
            <button onClick={()=>setComponent("cars")}>Cars</button>
            <button onClick={()=>setComponent("reservations")}>Reservations</button>
          </div>
        </nav>
        <div className={styles.homecontent}>
          <div className={styles.overviewboxes}>
            {component === "users" ? (
              <Users />
            ) : component === "cars" ? (
              <Cars />
            ) :  component === "reservations" ?(
              <Reservations />
            ):""}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
