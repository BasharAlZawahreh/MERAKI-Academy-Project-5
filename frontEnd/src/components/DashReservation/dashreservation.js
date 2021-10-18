import React,{useState,useEffect} from "react"
import axios from "axios"
import { useDispatch, useSelector,batch } from "react-redux";
import{setReservation,deleteReservation,setEditOrInsert,updateReservation}from "../../actions/reservations"
import Table from 'react-bootstrap/Table';
import { useHistory } from "react-router";
//import EditIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
import {MdOutlineStarRate  } from 'react-icons/md';


const ResevationDash=()=>{
const dispatch=useDispatch()
const history=useHistory()
    const [show, setShow] = useState(false);
   const state=useSelector((state)=>{
       return {
          token:state.token.token ,
        reservations: state.reservation.reservations,
        car_Id:state.searches.car_Id,
        editOrInsert:state.reservation.editOrInsert
    }
   })
   let car_id=state.car_Id

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
      }, []);
    return(
        <div style={{"padding":"30px"}}>
            <button onClick={()=>getReservationByuser()}  >GET My Reservations</button>
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Number</th>
      <th>PickUp Date</th>
      <th>Return Date</th>
      <th>Amount</th>
      <th>Brand</th>
      <th>Action</th>
      <th>Rate</th>
    </tr>
  </thead>
  <tbody>
      {show&&state.reservations&& state.reservations.map((elem,index)=>{
    return(
        <tr key={index}>
      <td>{index}</td>
      <td>{elem.PickUpDate}</td>
      <td>{elem.returnDate}</td>
      <td>{elem.amount}</td>
      <td>{elem.brand}</td>
      {/* <td>{!elem.isConfirmed?(
          <EditIcon
          onClick={()=>{
              batch(()=>{
                localStorage.setItem("elem",JSON.stringify(elem))
                  // dispatch(updateReservation(elem))
                  // dispatch(setEditOrInsert(true))
                  // history.push("/addRes")
                  // deleteReservationById(elem.res_id)
              })
          }}
          
          /> */}
       {/* ):""} */}
       {/* </td> */}
      {/* //       <td>{!elem.isConfirmed?( */}
      {/* //    <DeleteIcon */}
      {/* //    onClick={()=>{ */}
      {/* //       deleteReservationById(elem.res_id)
      //     }} */}
          
      {/* //     /> */}
      {/* // ):""}</td> */}
     <td></td>
      <td> <MdOutlineStarRate onClick={()=>
            
            history.push(`/rate/${elem.car_id}`)}/>  
      </td>
    </tr>
    )
    })}
    
  </tbody>
</Table>
</div>
    )
}
export default ResevationDash;