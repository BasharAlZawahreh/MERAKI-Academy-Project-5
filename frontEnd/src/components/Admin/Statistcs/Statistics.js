import React from "react";
import styles from "../Dashboard.module.css";
const Statistics=()=>{
    return(
        <>
        <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total Users</div>
          <div className={styles.number}>40,876</div>
          {/* <div className={styles.indicator}>
            <i class='bx bx-up-arrow-alt'></i>
            <span className={styles.text}>Up from yesterday</span>
          </div> */}
        </div>
        <i class='bx bx-cart-alt cart'></i>
      </div>

      <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total cards</div>
          <div className={styles.number}>40,876</div>
          {/* <div className={styles.indicator}>
            <i class='bx bx-up-arrow-alt'></i>
            <span className={styles.text}>Up from yesterday</span>
          </div> */}
        </div>
        <i class='bx bx-cart-alt cart'></i>
      </div>

      <div className={styles.box}>
        <div className={styles.rightside}>
          <div className={styles.boxtopic}>Total Users</div>
          <div className={styles.number}>40,876</div>
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