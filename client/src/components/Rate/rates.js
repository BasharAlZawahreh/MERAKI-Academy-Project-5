import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import{addRate,setRate}from '../../actions/Rate';
import { Rating } from "react-simple-star-rating";
import {useParams} from "react-router";
import Card from 'react-bootstrap/Card'
import { GiCancel } from "react-icons/gi";
import * as moment from 'moment'
import { useHistory } from "react-router";
import Button from "react-bootstrap/Button";
const AddRates=()=>{
  const history = useHistory();
 let car_id = useParams().id;
    const[comment,setComment]=useState()
    const[rate,setRate]=useState(0)
    const[rate_date,setRate_Date]=useState()
    const dispatch=useDispatch()
    // const [rating, setRating] = useState(0)
    const[x,setX]=useState()

const state=useSelector((state)=>{
    return{ token: state.token.token,
        car_Id:state.searches.car_Id,
        rates:state.rate.rates
    }
}) 



const CreateRate=()=>{
  
  console.log(rate)
  // setRate(rate)
   
  let now = new Date();
  let rate_date = moment(now).format('YYYY-MM-DD')
  
   // console.log("carr",state.car_Id)
    axios.post(`/rate/${car_id}`,{comment,rate,rate_date},
    {
      
      headers: { Authorization: `Bearer ${state.token}` },
      }
    
    ).then((result)=>{
        console.log(result)
        console.log(result.data)
       
        dispatch(addRate(result.data))
        history.push('/')
     
    }).catch((err)=>{
        console.log(err)
    })





}
const rte=(rate)=>{
  setRate(rate)
}

return(
   
    // </div>
    <div class="container-fluid py-5">
    <div class="container pt-5 pb-3">
      <center>
    <Card  style={{ height:"21rem",marginBottom:"1rem", width: "45rem",  backgroundColor: "#2B2E4A", alignItems: "center",flexDirection:"column" }}>
    <span
        style={{ marginLeft:"auto", cursor: "pointer" }}
        onClick={() => {
          history.push("/");
        }}
      >
        <GiCancel style={{ color: "white", width: "18px", height: "20px" }} />
      </span>
      <div style={{display:"flex",flexDirection:"row"}}>
      <img  style={{width:"40%",alignItems:"center",marginBottom:"31px",marginTop:"49px",height:"56%"}}  src="https://images.all-free-download.com/images/graphicthumb/quality_rating_banner_man_stars_icons_decor_6835108.jpg" class="card-img-top" alt="..."/>
    <Card.Body>
      <Card.Title style={{textAlign:'center',color:"white" ,fontWeight:'bold',marginTop:"30px"}}>Create Rate</Card.Title>
      <textarea placeholder="Comment" style={{marginTop:"15px",paddingTop:"inherit",width:"363px" }}  onChange={(e)=>{setComment(e.target.value)}} ></textarea>
<center>

      <Rating
     style={{ paddingVertical: 10 }}
      // defaultValue={rate}
    
      //  ratingValue={rate}
 
     onClick={rte}

       ratingValue={rate}
      
      //  rating={rating} onRating={(rate)=>setRating(rate)}
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
      <Button
          style={{ width: "100px", marginTop: "5PX" }}
          onClick={() => {
            CreateRate()
          }}
        >
          Submit
        </Button>
    </Card.Body>
    </div>
   </Card>
   
   </center>
</div>
</div>



)




}
export default  AddRates