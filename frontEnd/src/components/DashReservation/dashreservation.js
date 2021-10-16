import React,{useState,useEffect} from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import{setReservation,updateReservation,deleteReservation}from "../../actions/reservations"
const ResevationDash=()=>{

const dispatch=useDispatch()
    const [show, setShow] = useState(false);
    const [returnDate, setReturnDate] = useState("");
    const [PickUpDate, setPickUpDate] = useState("");
    const [amount, setAmount] = useState();

   const state=useSelector((state)=>{
       return {token:state.token.token ,
        reservations: state.reservation.reservations,}
   })

    const getReservationByuser=()=>{
        axios.get("http://localhost:5000/reserve/user",
        {
            headers: { Authorization: `Bearer ${state.token}` },
          }
        
        ).then((result)=>{
            dispatch(setReservation(result.data.Reservations))
            setShow(true)
        }).catch((err)=>{
            console.log("get reserve",err)
        })
        
      
    }

   
    const updateResrvationById=(id)=>{
        axios.put(`http://localhost:5000/reserve/${id}`,{returnDate,PickUpDate,amount,car_id},{
            headers: { Authorization: `Bearer ${state.token}`},
        }).then((result)=>{
            dispatch(updateReservation(result.data.reservation))
        }).catch((err)=>{
            console.log("updateReserve",err)
        })
    }



   const deleteReservationById=(id)=>{
    axios.delete(`http://localhost:5000/reserve/${id}`,{
        headers: { Authorization: `Bearer ${state.token}`},  
    }).then((result)=>{
        dispatch(deleteReservation(result.data.reservation))
    }).catch((err)=>{
        console.log("delete reserve",err)
    })
    }


    useEffect(() => {
      getReservationByuser();
      }, [state.reservation.reservations]);



    return(
        <div className="dashReserve">  
      

    
     
     <button onClick={getReservationByuser}  >GET My Reservations</button>
     
     {show&&
     state.reservations.map((elem,index)=>{
         return(
         <div key={index}>
         <div>returnDate {elem.returnDate}</div>
         <div>PickUpDate {elem.PickUpDate}</div>
         <div>amount{elem.amount}</div>

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
      <input type="number" disabled value={`${amount}`} placeholder="amount" />
     

     <button onClick={()=>{updateResrvationById()}}>Update</button>
     <button onClick={()=>{deleteReservationById()}}>Delete</button>



         </div>
         )
     })}
  
     )

        </div>
    )


}


export default ResevationDash