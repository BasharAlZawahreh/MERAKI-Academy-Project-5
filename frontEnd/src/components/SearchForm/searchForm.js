import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearches } from "../../actions/search";
import "./searchForm.css";
function SearchForm() {
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

  const dispatch = useDispatch();

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

  const submitSearch = async () => {
    const data = {
      car_type: carType,
      color: carColor,
      brand_car: carBrand,
      manifactoring_year: carYear,
      day_price_from: priceFrom,
      day_price_to: priceTo,
      model: model,
    };

    const res = await axios.post("http://localhost:5000/car/filter", data);

    console.log(res.data.result);
    dispatch(setSearches(res.data.result));
  };

  return (
    <>
      <div className="container-fluid bg-white pt-3 px-lg-5">
        <div className="row w-75">
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select
              className="custom-select px-4 mb-3"
              classNameName="form-control form-control-lg"
              onChange={(e) => {
                setcarType(e.target.value);
              }}
              style={{ height: "50px" }}
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
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select
              className="custom-select px-4 mb-3"
              onChange={(e) => setcarBrand(e.target.value)}
              style={{ height: "50px" }}
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
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select
              className="custom-select px-4 mb-3"
              onChange={(e) => setcarColor(e.target.value)}
              style={{ height: "50px" }}
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
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <select
              className="custom-select px-4 mb-3"
              onChange={(e) => setcarYear(e.target.value)}
              style={{ height: "50px" }}
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
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <div className="date mb-3" id="date" data-target-input="nearest">
              <input
                type="text"
                className="form-control p-4 datetimepicker-input"
                onChange={(e) => {
                  setModel(e.target.value);
                }}
                placeholder="Type model"
                data-target="#date"
                data-toggle="datetimepicker"
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <div className="date mb-3" id="date" data-target-input="nearest">
              <input
                type="text"
                className="form-control p-4 datetimepicker-input"
                onChange={(e) => {
                  setpriceFrom(e.target.value);
                }}
                placeholder="day Price From"
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <div className="time mb-3" id="time" data-target-input="nearest">
              <input
                type="text"
                className="form-control p-4 datetimepicker-input"
                placeholder="day Price to"
                onChange={(e) => {
                  setpriceTo(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 px-2">
            <button
              className="btn btn-primary btn-block mb-3"
              onClick={submitSearch}
              style={{ height: "50px" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchForm;
/*
<div classNameName="lg">
<form>
  <div classNameName="form-group">
    <select
      id="carTypes"

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

  <div classNameName="form-group">
    <select
      id="carBrands"
      classNameName="form-control form-control-lg"

    >

    </select>
  </div>

  <div classNameName="form-group">
    <select
      id="carColors"
      classNameName="form-control form-control-lg"

    >

    </select>
  </div>

  <div classNameName="form-group">
    <select
      id="carYear"
      classNameName="form-control form-control-lg"
    >

    </select>
  </div>

  <div classNameName="form-group">
    <input
      type="text"
      classNameName="form-control"
      id="model"
      placeholder="BMW"
      onChange={(e) => {
        setModel(e.target.value);
      }}
    />
  </div>

  <div classNameName="form-group">
    <input
      type="text"
      classNameName="form-control"
      id="dayPriceFrom"
      placeholder="15"

    />
    -
    <input
      type="text"
      classNameName="form-control"
      id="dayPriceTo"
      placeholder="300"

    />
  </div>
</form>

<button classNameName="btn btn-success" type="button" >
  Search
</button>
</div>
*/
