import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addReservation, updateReservation } from "../../actions/reservations";
import { useHistory,useParams } from "react-router";
import { jsx } from "@emotion/react";
import * as moment from "moment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GiCancel } from 'react-icons/gi';
import Payment from "../Payment/payment";
// import "./reservation.css";
const AddReservation = () => {
  const history=useHistory()
  const dispatch = useDispatch();
  const [returnDate, setReturnDate] = useState("");
  const [PickUpDate, setPickUpDate] = useState("");
  const [amount, setAmount] = useState();
  const [users_id, setUsers_id] = useState();
  const [isOk, setIsOk] = useState(true);
  const car_id=useParams().id;
  //  const[car_id,setCar_id]=useState("2")
  //   const [price, setPrice] = useState();
  const state = useSelector((state) => {
    return {
      token: state.token.token,
      reservations: state.reservation.reservations,
      car_Id: state.searches.car_Id,
      editOrInsert: state.reservation.editOrInsert,
      reservation: state.reservation.farhan,
    };
  });

  let newvalue = JSON.parse(localStorage.getItem("elem"));

     const getStatus=async()=>{
       try{
        await   axios.get("http://localhost:5000/reserve/user/check", {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((result)=>{
          console.log(result.data.status)
          setIsOk(result.data.status)
        }).catch((err)=>{
          console.log("status",err)
        })
       }catch(err){
         console.log(err)
       }
     
     }








  const updatebooking = async (car_id) => {
    // let data={ returnDate=newvalue.returnDate, PickUpDate=newvalue.returnDate, amount, car_id }
    try {
      let price = newvalue.day_price;
      let difference =
        new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
      let days = Math.ceil(difference / (1000 * 3600 * 24));
      setAmount(days * price);
      // calc();
      // console.log("pick", PickUpDate);
      // console.log("return", returnDate);
      // console.log("id", car_id);
      // console.log("amount", amount);
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
    } catch (error) {
      console.log("catch", error);
    }
  };
  const booking = async () => {
    try {
      await axios
        .get(`http://localhost:5000/car/car/${car_id}`)
        .then((result) => {
          let price = result.data.result[0].day_price;
          let difference =
            new Date(PickUpDate).getTime() - new Date(returnDate).getTime();
          let days = Math.ceil(difference / (1000 * 3600 * 24));
          setAmount(days * price);
        })
        .then(() => {
           axios
            .post(
              "http://localhost:5000/reserve",
              { returnDate, PickUpDate, amount, car_id },
              {
                headers: { Authorization: `Bearer ${state.token}` },
              }
            )
            .then((result) => {
              console.log(result.data)
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
  useEffect(()=>{
    getStatus()
  },[])
  return (
    <>
    {!state.token?(
      history.push("/login")
    ):(
      !state.editOrInsert && isOk? (
     
        
        <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
       
        <Card
          style={{
            flexDirection:"column",
         
            alignItems: "center",
            color: "white",
            width: "50rem",
            marginLeft:"10vw",
            height: "400px",
            // marginLeft: "25%",
            // marginTop: "150px",
            backgroundColor:"#2B2E4A",
          }}
        >
     
         <span style={{cursor:"pointer",alignSelf:"flex-end"}}  onClick={()=>{history.push("/")}}><GiCancel style={{color:"white",width:"18px",height:"20px"}}/></span>
         <div style={{display:"flex",flexDirection:"row"}}>
            <img  style={{width:"30%",alignItems:"center",marginBottom:"34px",marginLeft:"13px",marginTop:"30px",height:"73%"}}  src="https://media.istockphoto.com/photos/calendar-3d-rendering-picture-id1186714981?b=1&k=20&m=1186714981&s=170667a&w=0&h=7vwc61aDoI8b63-UZ4GAYTEAOigv9UPxVzfswTyyzzU=" class="card-img-top" alt="..."/>
         
        
          <Card.Body>
            <Card.Title
              style={{
                textAlign: "center",
                marginRight:"70px",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "20px",
               color: "white",

              }}
            >
              Reservation
            </Card.Title>
            <Card.Text>
              <input
                // style={{ marginTop: "40px" }}
                type="date"
                placeholder="returnDate"
                onChange={(e) => setReturnDate(e.target.value)}
              />

              <input
                style={{ marginTop: "40px" }}
                type="date"
                placeholder="PickUpDate"
                onChange={(e) => setPickUpDate(e.target.value)}
              />
              <input
                style={{ marginTop: "30px",color:"white" }}
                type="number"
                disabled
                value={`${amount}`}
                placeholder="amount"
              />
            </Card.Text>
            <Payment/>
            <Button

              style={{ marginTop: "10%", marginLeft: "27%" }}
              
              className="btn btn-secondary"
              // variant="secondary"
              onClick={() => {
                booking();
              }}
            >
              Reservation
            </Button>
          </Card.Body>
          </div>
        </Card>
        </div>
        </div>
      ) : !isOk && !state.editOrInsert ?(
        history.push("/editprofile")):!isOk && state.editOrInsert ?(
        
        <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
        <Card
         
         
            style={{
              flexDirection:"column",
           
              alignItems: "center",
              color: "white",
              width: "50rem",
              marginLeft:"10vw",
              height: "400px",
              // marginLeft: "25%",
              // marginTop: "150px",
              backgroundColor:"#2B2E4A",
            }}
        >
            <span style={{marginLeft:"23.5rem",cursor:"pointer"}}  onClick={()=>{history.push("/myres")}}><GiCancel style={{color:"white",width:"18px",height:"20px"}}/></span>
            <div style={{display:"flex",flexDirection:"row"}}>

            <img  style={{width:"30%",alignItems:"center",marginBottom:"34px",marginLeft:"13px",marginTop:"30px",height:"73%"}}  src="https://media.istockphoto.com/photos/calendar-3d-rendering-picture-id1186714981?b=1&k=20&m=1186714981&s=170667a&w=0&h=7vwc61aDoI8b63-UZ4GAYTEAOigv9UPxVzfswTyyzzU=" class="card-img-top" alt="..."/>
          <Card.Body>
            <Card.Title style={{ textAlign: "center",color:"white" , fontWeight: "bold" }}>
              Reservation
            </Card.Title>
            <Card.Text>
              <input
                style={{ marginTop: "30px" }}
                type="date"
                placeholder="returnDate"
                defaultValue={moment(new Date(newvalue.returnDate)).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => setReturnDate(e.target.value)}
              />

              <input
                style={{ marginTop: "30px" }}
                type="date"
                placeholder="PickUpDate"
                defaultValue={moment(new Date(newvalue.PickUpDate)).format(
                  "YYYY-MM-DD"
                )}
                onChange={(e) => setPickUpDate(e.target.value)}
              />
              <input
                style={{ marginTop: "30px",color:"white"  }}
                type="number"
                disabled
                value={`${newvalue.amount}`}
                placeholder="amount"
              />
            </Card.Text>
            <Button
              style={{ marginTop: "35px", marginLeft: "100px" }}
              variant="secondary"
              onClick={() => {
                updatebooking(newvalue.car_id);
              }}
            >
              Update
            </Button>
          </Card.Body>
          </div>
        </Card>
        </div>
        </div>
          
    ):""
              )}
    </>

  );
            
};


export default AddReservation;
