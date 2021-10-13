import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReservation } from "../../actions/reservations";
const AddReservation = () => {
  const dispatch = useDispatch();
  const [returnDate, setReturnDate] = useState("");
  const [PickUpDate, setPickUpDate] = useState("");
  const [amount, setAmount] = useState();
  const [users_id, setUsers_id] = useState();
  //  const[car_id,setCar_id]=useState("2")
//   const [price, setPrice] = useState();
  const state = useSelector((state) => {
    return {
      token: state.token.token,
      reservations: state.reservation.reservations,
    };
  });
  let car_id = 1;
  // const getCar=()=>{
  // // sum()
  // }
  console.log(PickUpDate);
  console.log(returnDate);
  const booking = async () => {
    try {
      await axios
        .get(`http://localhost:5000/car/car/1`)
        .then(async (result) => {
            console.log(result);
          let price = result.data.result[0].day_price;
        //   let Pick = PickUpDate;
        //   let returnD = returnDate;
          let difference = new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
          let days = Math.ceil(difference / (1000 * 3600 * 24));
          console.log(difference);
          setAmount(days * price);
        }).then(async()=>{
            await axios
            .post(
              "http://localhost:5000/reserve",
              { returnDate, PickUpDate, amount, car_id },
              {
                headers: { Authorization: `Bearer ${state.token}` },
              }
            )
            .then((result) => {
              dispatch(addReservation(result.data.Reservations));
            })
            .catch((err) => {
              console.log("reserveErr", err);
            });
        })
        .catch((err) => {
          console.log("priceErr", err);
        });
    } catch (error) {
      console.log("catchPrice", error);
    }
  };
// useEffect(()=>{
// },[amount])
  return (
    <div className="Reservation_content">
      <input
        type="date"
        placeholder="returnDate"
        onChange={(e) => setReturnDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="PickUpDate"
        onChange={(e) => setPickUpDate(e.target.value)}
      />
      <input type="number" disabled value={`${amount} JD`} placeholder="amount" />
      <button
        onClick={() => {
          booking();
        }}
      >
        Reservation
      </button>
    </div>
  );
};
export default AddReservation;