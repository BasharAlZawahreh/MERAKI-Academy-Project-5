import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import{addRate,setRate}from '../../actions/Rate';
import { Rating } from "react-simple-star-rating";
import {useParams} from "react-router";
import Card from 'react-bootstrap/Card'
import * as moment from 'moment'
const AddRates=()=>{
 let car_id = useParams().id;
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

const CreateRate=(rate)=>{
  
  console.log(rate)
  setRate(rate)
   
  let now = new Date();
  let rate_date = moment(now).format('YYYY-MM-DD')
  
   // console.log("carr",state.car_Id)
    axios.post(`http://localhost:5000/rate/${car_id}`,{comment,rate,rate_date},
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
    // <div>
     
    //  <Rating
    //     onClick={CreateRate}
      
    //    ratingValue={rate}
    //     size={20}
    //     label
    //     transition
    //     fillColor="orange"
    //     emptyColor="gray"
    //     className="foo" // Will remove the inline style if applied
    //   />

        

    //     <textarea placeholder="Comment"   onChange={(e)=>{setComment(e.target.value)}}  ></textarea>
        
       
    //     <input type='date' placeholder="rate_date" onChange={(e)=>{setRate_Date(e.target.value)}} />



    // </div>
    <div class="container-fluid py-5">
    <div class="container pt-5 pb-3">
    <Card style={{color:"white" ,height:"400px",backgroundColor:'#003638' }}>
 
    <Card.Body>
      <Card.Title style={{textAlign:'center',color:"white" ,fontWeight:'bold',marginTop:"30px"}}>Create Rate</Card.Title>
      <textarea placeholder="Comment" style={{marginTop:"40px", width: '100%'}}  onChange={(e)=>{setComment(e.target.value)}}  ></textarea>
<center>

      <Rating
    style={{ paddingVertical: 10 }}
        
    onClick={CreateRate} 
       ratingValue={rate}
        size={45}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo" // Will remove the inline style if applied
      />
</center>

      <Card.Text >

      {/* <Rating
        onClick={CreateRate}
      
       ratingValue={rate}
        size={20}
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="foo" // Will remove the inline style if applied
      /> */}
     
      
         {/* <button type='date' placeholder="rate_date"    style={{marginTop:'40px'}} onChange={(e)=>{setRate_Date(e.target.value)}} /> */}
  
      </Card.Text>
    
    </Card.Body>
   </Card>

</div>
</div>



)




}
export default  AddRates