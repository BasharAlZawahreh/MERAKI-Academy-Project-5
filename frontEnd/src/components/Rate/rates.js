import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import{addRate,setRate}from '../../actions/Rate';
import { Rating } from "react-simple-star-rating";


const AddRates=()=>{
    const[comment,setComment]=useState()
    const[rate,setRate]=useState()
    const[rate_date,setRate_Date]=useState()
    const dispatch=useDispatch()
    const [rating, setRating] = useState(0)

const state=useSelector((state)=>{
    return{ token: state.token.token,
        car_Id:state.searches.car_Id,
        rates:state.rate.rates
    }
}) 

const createRate=(rate)=>{
    let car_id=state.car_Id
  console.log(rate)
  setRate(rate)
    
    console.log("carr",state.car_Id)
    axios.post(`http://localhost:5000/rate/2`,{comment,rate,rate_date},
    {
      
        headers: { Authorization: `Bearer ${state.token}` },
      }
    
    ).then((result)=>{
        console.log(result)
        console.log(result.data)
        dispatch(addRate(result.data))
    }).catch((err)=>{
        console.log(err)
    })
}


return(
    <div>
     
     <Rating
        onClick={createRate}
      
       ratingValue={rate}
        size={20}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo" // Will remove the inline style if applied
      />

        

        <textarea placeholder="Comment"   onChange={(e)=>{setComment(e.target.value)}}  ></textarea>
        
       
        <input type='date' placeholder="rate_date" onChange={(e)=>{setRate_Date(e.target.value)}} />



    </div>
)




}
export default  AddRates