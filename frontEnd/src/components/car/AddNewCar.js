import React,{useEffect,useState} from "react";
import axios from "axios";
//rcfe
import { useSelector, useDispatch } from "react-redux";

const AddNewCar=()=>{
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
    const [priceFrom, setpriceFrom] = useState(0);
    const [priceTo, setpriceTo] = useState(0);
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
    
      const getCarTypes = async () => {
        const res = await axios.get("http://localhost:5000/car/cartypes");
        if (res.data.result) {
          setcarTypes(res.data.result);
        }
      };
      const getCarBrands = async () => {
        const res = await axios.get("http://localhost:5000/car/carbrands");
        if (res.data.result) {
          setcarBrands(res.data.result);
        }
      };
    
      useEffect(() => {
        getCarBrands();
        getCarTypes();
        getAllYears();
      }, []);
    return (<div>
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
                  <option value={type.car_type} key={i}>
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
                  <option value={brand.brand} key={i}>
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

  <div class="form-group">
    <label for="formGroupExampleInput">model</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter your car's model"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">discription</label>
    <textarea type="text" class="form-control" id="formGroupExampleInput2" placeholder="over view for your car's"/>
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">Day price </label>
    <textarea type="text" class="form-control" id="formGroupExampleInput2" placeholder="price ber day"/>
  </div>
</form>

<button className="btn btn-success" type="button" >
        add
      </button>
    </div>)
}
export default AddNewCar