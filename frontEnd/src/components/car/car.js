// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from 'react-bootstrap/Card'
// import ListGroup from 'react-bootstrap/ListGroup'
// import ListGroupItem from 'react-bootstrap/ListGroupItem'
// import InputGroup from 'react-bootstrap/InputGroup'

// import FormControl from 'react-bootstrap/FormControl'

// import { Route ,useHistory,useParams} from "react-router-dom";
// // import {Card,ListGroup,ListGroupItem,InputGroup,FormControl,} from "react-bootstrap"
// import { useSelector, useDispatch } from "react-redux";
// import { setCar, updateCar } from "../../actions/cars/index";
// import UpdateCar from "./UpdateCar";
// // import Button from 'react-bootstrap/Button'

// const Car = ({ car }) => {
//   const hestory = useHistory()
// console.log("car,",car);

//   return (
   
//    <>
//    {/* <div class="container">
//   <div class="row">
//     <div class="col-12">
// 		<table class="table table-image">
// 		  <thead>
// 		    <tr>
// 		      <th scope="col">Car ID</th>
// 		      <th scope="col">Image</th>
// 		      <th scope="col">Brand</th>
// 		      <th scope="col">Model</th>
// 		      <th scope="col">manifactoring year</th>
// 		      <th scope="col">availability</th>
// 		    </tr>
// 		  </thead>
// 		  <tbody>
// 		    <tr>
// 		      <th scope="row">1</th>
// 		      <td class="w-25">
// 			      <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-3.jpg" class="img-fluid img-thumbnail" alt="Sheep"/>
// 		      </td>
// 		      <td>Bootstrap 4 CDN and Starter Template</td>
// 		      <td>Cristina</td>
// 		      <td>913</td>
// 		      <td>2.846</td>
// 		    </tr>
// 		    <tr>
// 		      <th scope="row">2</th>
// 		      <td class="w-25">
// 			      <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/sheep-5.jpg" class="img-fluid img-thumbnail" alt="Sheep"/>
// 		      </td>
// 		      <input defaultValue={car.brand}></input>
//           <td>Bootstrap Grid 4 Tutorial and Examples</td>
// 		      <td>Cristina</td>
// 		      <td>1.434</td>
// 		      <td>3.417</td>
// 		    </tr>
// 		  </tbody>
// 		</table>   
//     </div>
//   </div>
// </div> */}
//      <Card style={{ width: "18rem" }}>
//       <Card.Img variant="top" src={car.main_img} />
//       </Card>
//       <Card.Body>
//         <input defaultValue={car.brand}></input>
//         <Card.Text>{car.model}</Card.Text>
//         <Card.Text>{car.description}</Card.Text>
//       </Card.Body>
//       <ListGroup className="list-group-flush">
//         <ListGroupItem>{car.manifactoring_year}</ListGroupItem>
//         <ListGroupItem>{car.day_price}JD</ListGroupItem>
//       </ListGroup>
      
//       <button onClick={()=>{ 
//                 hestory.push(`/updateCar/${car.car_id}`)
//        }}>Update</button>
//     {/* {/* <Card style={{ width: "18rem" }}>
//       <Card.Img variant="top" src={car.main_img} />
//       <Card.Body>
//         <Card.Title>{car.brand}</Card.Title>
//         <Card.Text>{car.model}</Card.Text>
//         <Card.Text>{car.description}</Card.Text>
//       </Card.Body>
//       <ListGroup className="list-group-flush">
//         <ListGroupItem>{car.manifactoring_year}</ListGroupItem>
//         <ListGroupItem>{car.day_price}JD</ListGroupItem>
//       </ListGroup>
//       <Card.Body>
//         <Card.Button href="#">Card Link</Card.Button>
       
//           <InputGroup className="mb-3">
//             <InputGroup.Checkbox aria-label="Checkbox for following text input" />
//             <FormControl aria-label="Text input with checkbox" />
//           </InputGroup>
        
//         <Card.Link href="#">Update</Card.Link>
//       </Card.Body>
//     </Card> */}  
     
//     </>
//   );
// };
// export default Car;
