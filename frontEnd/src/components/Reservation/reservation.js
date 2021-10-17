import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReservation ,updateReservation} from "../../actions/reservations";
import { useHistory } from "react-router";
import { jsx } from "@emotion/react";
import * as moment from 'moment'
import "./reservation.css"
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
      car_Id:state.searches.car_Id,
      editOrInsert:state.reservation.editOrInsert,
      reservation:state.reservation.farhan,

    };
  });

    let newvalue=JSON.parse(localStorage.getItem("elem"))
  
  // useEffect(()=>{
  //   console.log(state.reservation);

  // })
  let car_id=state.car_Id
//   const calc=()=>{
// try {
//   let price = newvalue.day_price;
//   let difference = new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
//   let days = Math.ceil(difference / (1000 * 3600 * 24));
//   console.log("difference",difference);
//   console.log("days",days);
//   setAmount(days * price);
  
// } catch (error) {
//   console.log(error);
// }
//   }
//   const updateResrvationById=async(id)=>{
//         calc();
//     try {
//      await axios.put(`http://localhost:5000/reserve/${id}`,{returnDate,PickUpDate,amount},{
//           headers: { Authorization: `Bearer ${state.token}`},
//       }).then((result)=>{
//         console.log("Nssss",result);
//           dispatch(updateReservation(result.data.reservation))
//       }).catch((err)=>{
//           console.log("updateReserve",err)
//       })
//     } catch (error) {
//       console.log(error);
//     }
// }
const updatebooking = async (car_id) => {
  // let data={ returnDate=newvalue.returnDate, PickUpDate=newvalue.returnDate, amount, car_id }
  console.log(newvalue);
  try {
        let price = newvalue.day_price;
        let difference = new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
        let days = Math.ceil(difference / (1000 * 3600 * 24));
        setAmount(days * price);
        // calc();
        console.log("pick",PickUpDate);
        console.log("return",returnDate);
        console.log("id",car_id);
        console.log("amount",amount);
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
      }catch(error){
      console.log("catch", error);
      }

};
  const booking = async () => {
    try {
      await axios
        .get(`http://localhost:5000/car/car/${car_id}`)
        .then((result) => {
          let price = result.data.result[0].day_price;
          let difference = new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
          let days = Math.ceil(difference / (1000 * 3600 * 24));
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
            .then(async(result) => {
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
    <>
    {state.editOrInsert?(
      <div className="Reservation_content" style={{padding:"30px"}}>
        <label htmlFor="returnDate">Return Date</label>
      <input
        type="date"
        placeholder="returnDate"
        onChange={(e) => setReturnDate(e.target.value)}
        id="returnDate"
      /><br/>
        <label htmlFor="PickUpDate">PickUp Date</label>
      <input
        type="date"
        placeholder="PickUpDate"
        onChange={(e) => setPickUpDate(e.target.value)}
        id="PickUpDate"
      /><br/>
        <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" disabled value={`${amount}`} placeholder="amount" /><br/>
      <button
        onClick={() => {
          booking();
        }}
      >
        Reservation
      </button>
      </div>
    ):(
      <div className="Reservation_content">
      <input
        type="date"
        placeholder="returnDate"
        defaultValue={moment(new Date(newvalue.returnDate)).format('YYYY-MM-DD')}
        onChange={(e) => setReturnDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="PickUpDate"
        defaultValue={moment(new Date(newvalue.PickUpDate)).format('YYYY-MM-DD')}
        onChange={(e) => setPickUpDate(e.target.value)}
      />
      <input type="number" disabled value={`${newvalue.amount}`} placeholder="amount" />
      <button 
        onClick={() => {
          updatebooking(newvalue.car_id);
        }}
      >
        Update Reservation
      </button>
      </div>
    )}
</>
  );
};
export default AddReservation;