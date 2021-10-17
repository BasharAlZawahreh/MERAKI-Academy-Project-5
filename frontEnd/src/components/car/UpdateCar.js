import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../config";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCar } from "../../actions/cars/index";

const UpdateCar = ({ car }) => {

    const state = useSelector((state) => {
        return { cars: state.car.cars,
           token: state.token.token };
      });

    const dispatch = useDispatch()
    
    const [message,setMessage]=useState("");  
    const [available,setAvailable] = useState("");
     const [disabled,setDisabled]=useState(true);
  const [mainImg,setMainImg]=useState("");
  const [carColor, setcarColor] = useState("");
  const [dayPrice, setDayPrice] = useState(0);
  const [desc, setdesc] = useState("");


  let id = useParams().id;

  const colors = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];


  const addMainIm = (e) => {
    
    let task=[]
    if (e.target.files[0]) {
      let img = e.target.files[0]
      let uploadTask = storage.ref(`images/${img.name}`).put(img);
      task.push(uploadTask);
      uploadTask.on(
        "state_change",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(img.name)
           .getDownloadURL()
            .then(async(url) => {
              console.log(url);
              setMainImg(url)
             
             })
            
        }
      )
      Promise.all(task)
    }
    
  };

//   useEffect(()=>{
//     console.log("odao",mainImg);
//     if(mainImg){
//         setDisabled(false)
//     }
  
//   })

  const addToData=async()=>{
      let avl = 1
      if(available==="no"){
        avl=0
      }else if(available==="yes"){
        avl = 1
      }

    let data = {   
      color:carColor,
  
     description:desc,
 
     day_price:dayPrice,
     is_Available:avl,

     main_img:mainImg
     }
     console.log(data,"data");
  
      await axios.put(`http://localhost:5000/car/${id}`,data,{headers:{authorization:`Bearer ${state.token}`}})
       .then((result)=>{
    //   dispatch(updateCar())
    console.log(result)
    setMessage("updated Successfuly")

       })
       .catch(err=>{console.log("err");})
  
       
  };
  return (
    <>
      <div>Enter the Updated field which you want to update it</div><br></br>
      <div>
      <form>
     

        <div className="form-group">
        <div className="form-group">
        
          <input
          placeholder="main img"
            type="file"
            className="form-control"
            id="formGroupExampleInput"
            onChange={addMainIm}
          />
        </div>
         
          <select
            id="carColors"
            className="form-control form-control-lg"
            onChange={(e) => setcarColor(e.target.value)}
          >
            <option defaultValue>choose a color</option>

            {colors.map((color, i) => {
              return (
                <option value={color} key={i}>
                  {color}
                </option>
              );
            })}
          </select>
        </div>
       
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">discription</label>
          <textarea
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="over view for your car's"
            onChange={(e)=>{setdesc(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Day price </label>
          <textarea
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="price ber day"
            onChange={(e)=>{setDayPrice(e.target.value)}}

          />
        </div>
        <div className="form-group">
          <label htmlFor="formGroupExampleInput2">Availability</label>
          <textarea
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="write yes or no "
            onChange={(e)=>{setAvailable(e.target.value.toLocaleLowerCase())}}

          />
        </div>
        

      </form>
     

    </div>
    <br></br>
     <button className="addcar"  type="button"  onClick={addToData}>
      Save youre Update   </button><br></br>
      {message}
    </>
  );
};
export default UpdateCar;
