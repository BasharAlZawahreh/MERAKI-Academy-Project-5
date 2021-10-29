import React from "react";
import styles from "../Dashboard.module.css";
import {Bar} from 'react-chartjs-2'
const Statistics=({usersStatistics,carsStatistics,reservationsStatistics})=>{
  // const {usersStatistics,carsStatistics,reservationsStatistics}=statistics
  const data = {
    labels: ['Users', 'Cars', 'Reservations'],
    datasets: [
      {
        label: 'Auto Rental Statistics',
        data: [usersStatistics, carsStatistics, reservationsStatistics],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
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
      <Bar  width={100}
  height={40} data={data} options={options} />
      </>
    )
}
export default Statistics;