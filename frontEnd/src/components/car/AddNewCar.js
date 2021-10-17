import React, { useEffect, useState } from "react";
import axios from "axios";
//rcfe
import "../car/AddNewCar.css"
import { storage } from "../config";
import { useSelector } from "react-redux";
let car_id = 0
let x =""

let odaisUrl=[]
const AddNewCar = () => {
  let message =""

 const [imgUrl,setImgUrl]=useState("")
 const [x,setx]=useState("")
   const state =useSelector((state)=>{
   return{token:state.token.token} 
  })
   console.log("stateCar",state.token);


  const [progress, setProgress] = useState(0);

  const [carTypes, setcarTypes] = useState([]);
  const [carBrands, setcarBrands] = useState([]);
  const [allYears, setAllYears] = useState([]);
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

  const [carType, setcarType] = useState("");
  const [carBrand, setcarBrand] = useState("");
  const [carColor, setcarColor] = useState("");
  const [carYear, setcarYear] = useState(0);
  const [dayPrice, setDayPrice] = useState(0);
  const [desc, setdesc] = useState("");
  const [model, setModel] = useState("");

  const getAllYears = () => {
    const years = [];
    const nowYear = new Date().getFullYear();
    const startYear = 1990;
    for (let i = startYear; i <= nowYear; i++) {
      years.push(i);
    }
    setAllYears(years);
  };

  const getCarBrands = async () => {
    const res = await axios.get("http://localhost:5000/car/carbrands");
    if (res.data.result) {
      setcarBrands(res.data.result);
    }
  };
  const getCarTypes = async () => {
    console.log("ddd")
    const res = await axios.get("http://localhost:5000/car/cartypes");
    

    if (res.data.success) {
      setcarTypes(res.data.result);
    }
  };

  useEffect(() => {
    getCarBrands();
    getCarTypes();
    getAllYears();
  }, []);

  const addMainIm = (e) => {
    let task=[]
    if (e.target.files[0]) {
      let mainOdai = e.target.files[0]
      let uploadTask = storage.ref(`images/${mainOdai.name}`).put(mainOdai);
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
            .child(mainOdai.name)
           .getDownloadURL()
            .then(async(url) => {
              console.log(url);
              setx(url)
              console.log("odai",x);
             })
            
        }
      )
      Promise.all(task)
    }
    
  };
  
  
  const handleChange = (e) => {
    let odais = []
   
    console.log(e.target.files.length);
    
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      odais.push(newImage)
      console.log("=>",odais);
    }
    if(odais.length===e.target.files.length){
      const promises = [];
      odais.map((image) => {
       
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            console.log(error);
          },
           () => {
             storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                // console.log("url",url);
                odaisUrl.push(url)
                if(odaisUrl.length===e.target.files.length){
                console.log(odaisUrl)
                setImgUrl(odaisUrl)
              console.log(imgUrl);}
                //setImgUrl((oldUrl=>[...oldUrl,url]))
              });
          }
        );
      });
      Promise.all(promises)
      // console.log(odaisUrl);
    }
  };
  
  
 
  



 

 

const addToData=async()=>{

  let data = {   
    color:carColor,
   model: model,
   description:desc,
   manifactoring_year:carYear,
   day_price:dayPrice,
   car_types_id:carType,
   car_brand_id:carBrand,
   main_img:x
   }

    await axios.post("http://localhost:5000/car",data,{headers:{authorization:`Bearer ${state.token}`}})
     .then(result=>{ message=`added successfuly`
     car_id=result.data.insertId
   console.log("car_Id",car_id)})
     .catch(err=>{console.log("err");})

     await  axios.post("http://localhost:5000/car/imgs",{imgUrl,car_id},{headers:{authorization:`Bearer ${state.token}`}})
     .then(result=>{
       console.log(result);
     })
   .catch((err) => console.log(err))
};

const [enable,setEnable]=useState(true)

useEffect(()=>{
  console.log("IM here");
  if(x&&imgUrl){
    console.log("Odai taha jaabb");
    setEnable(false)
    
  }

},[x,imgUrl])

  return (
    <>
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="carTypes">car type</label>
          <select
            id="carTypes"
            className="form-control form-control-lg"
            onChange={(e) => {
              setcarType(e.target.value);
            }}
          >
            <option defaultValue>choose a type</option>
            {carTypes &&
              carTypes.map((type, i) => {
                return (
                  <option value={type.typeCar_id} key={i}>
                    {type.car_type}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="carBrands">car brand</label>
          <select
            id="carBrands"
            className="form-control form-control-lg"
            onChange={(e) => setcarBrand(e.target.value)}
          >
            <option defaultValue>choose a brand</option>

            {carBrands &&
              carBrands.map((brand, i) => {
                return (
                  <option value={brand.brand_id} key={i}>
                    {brand.brand}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="carColors">car color</label>
          <select
            id="carColors"
            className="form-control form-control-lg"
            onChange={(e) => setcarColor(e.target.value)}
          >
            <option defaultValue>choose a type</option>

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
          <label htmlFor="carYear">car year</label>
          <select
            id="carYear"
            className="form-control form-control-lg"
            onChange={(e) => setcarYear(e.target.value)}
          >
            <option defaultValue>choose a year</option>

            {allYears &&
              allYears.map((year, i) => {
                return (
                  <option value={year} key={i}>
                    {year}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="formGroupExampleInput">model</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Enter your car's model"
            onChange = {(e)=>{setModel(e.target.value)}}
          />
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
          <input
            type="file"
            className="form-control"
            id="formGroupExampleInput"
            onChange={addMainIm}
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            multiple
            className="form-control"
            id="formGroupExampleInput"
            onChange={handleChange}
          />
        </div>
      </form>
     

    </div>

     <button className="addcar" disabled={enable} type="button"  onClick={addToData}>
     add youre car 
   </button>
   </>
  );
};
export default AddNewCar;
