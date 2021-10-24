import React from "react";
import styles from "../Dashboard.module.css";
const Statistics=({usersStatistics,carsStatistics,reservationsStatistics})=>{
  // const {usersStatistics,carsStatistics,reservationsStatistics}=statistics
    return(
        <>
        <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total Users</div>
          <div className={styles.number}>{usersStatistics}</div>
          {/* <div className={styles.indicator}>
            <i class='bx bx-up-arrow-alt'></i>
            <span className={styles.text}>Up from yesterday</span>
          </div> */}
        </div>
        <i class='bx bx-cart-alt cart'></i>
      </div>

      <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total Cars</div>
          <div className={styles.number}>{carsStatistics}</div>
          {/* <div className={styles.indicator}>
            <i class='bx bx-up-arrow-alt'></i>
            <span className={styles.text}>Up from yesterday</span>
          </div> */}
        </div>
        <i class='bx bx-cart-alt cart'></i>
      </div>

      <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total Reservations</div>
          <div className={styles.number}>{reservationsStatistics}</div>
          {/* <div className={styles.indicator}>
            <i class='bx bx-up-arrow-alt'></i>
            <span className={styles.text}>Up from yesterday</span>
          </div> */}
        </div>
        <i class='bx bx-cart-alt cart'></i>
      </div>
      </>
    )
}

export default Statistics;