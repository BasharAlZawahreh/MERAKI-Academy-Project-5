import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
//rcfe
import "../car/AddNewCar.css";
import { storage } from "../config";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GiCancel } from "react-icons/gi";
let car_id = 0;
let x = "";

let odaisUrl = [];
const AddNewCar = () => {
  let message = "";
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState("");
  const [x, setx] = useState("");
  const state = useSelector((state) => {
    return { token: state.token.token };
  });
  console.log("stateCar", state.token);

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
    const res = await axios.get("/car/carbrands");
    if (res.data.result) {
      setcarBrands(res.data.result);
    }
  };
  const getCarTypes = async () => {
    console.log("ddd");
    const res = await axios.get("/car/cartypes");

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
    let task = [];
    if (e.target.files[0]) {
      let mainOdai = e.target.files[0];
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
            .then(async (url) => {
              console.log(url);
              setx(url);
              console.log("odai", x);
            });
        }
      );
      Promise.all(task);
    }
  };

  const handleChange = (e) => {
    let odais = [];

    console.log(e.target.files.length);

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      odais.push(newImage);
      console.log("=>", odais);
    }
    if (odais.length === e.target.files.length) {
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
                odaisUrl.push(url);
                if (odaisUrl.length === e.target.files.length) {
                  console.log(odaisUrl);
                  setImgUrl(odaisUrl);
                  console.log(imgUrl);
                }
                //setImgUrl((oldUrl=>[...oldUrl,url]))
              });
          }
        );
      });
      Promise.all(promises);
      // console.log(odaisUrl);
    }
  };

  const addToData = async () => {
    let data = {
      color: carColor,
      model: model,
      description: desc,
      manifactoring_year: carYear,
      day_price: dayPrice,
      car_types_id: carType,
      car_brand_id: carBrand,
      main_img: x,
    };

    await axios
      .post("/car", data, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        message = `added successfuly`;
        car_id = result.data.insertId;
        console.log("car_Id", car_id);
      })
      .catch((err) => {
        console.log("err");
      });

    await axios
      .post(
        "/car/imgs",
        { imgUrl, car_id },
        { headers: { authorization: `Bearer ${state.token}` } }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));

    history.push("/mycars");
  };

  const [enable, setEnable] = useState(true);

  useEffect(() => {
    console.log("IM here");
    if (x && imgUrl) {
      console.log("Odai taha jaabb");
      setEnable(false);
    }
  }, [x, imgUrl]);

  return (
    <>
      <center>
        <Card
          style={{
            width: "50rem",

            backgroundColor: "#2B2E4A",
            alignItems: "center",
            flexDirection: "column",
            height: "36rem",
          }}
        >
          <span
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <GiCancel
              style={{ color: "white", width: "18px", height: "20px" }}
            />
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "549px",
            }}
          >
            <Card.Img
              style={{
                width: "30%",
                alignItems: "center",
                marginBottom: "34px",
                marginLeft: "13px",
                marginTop: "57px",
                height: "83%",
              }}
              variant="top"
              src="https://wallpapercave.com/wp/wp4028757.jpg"
            />
            <Card.Body>
              <Card.Title style={{ color: "white" }}>AddCar</Card.Title>
              <form>
                {/* <div> */}
                <select
                  style={{ marginTop: "7px" }}
                  id="carTypes"
                  className="form-control form-control-md"
                  onChange={(e) => {
                    setcarType(e.target.value);
                  }}
                >
                  <option defaultValue>Choose a type</option>
                  {carTypes &&
                    carTypes.map((type, i) => {
                      return (
                        <option value={type.typeCar_id} key={i}>
                          {type.car_type}
                        </option>
                      );
                    })}
                </select>

                <select
                  style={{ marginTop: "7px" }}
                  id="carBrands"
                  className="form-control form-control-md"
                  onChange={(e) => setcarBrand(e.target.value)}
                >
                  <option defaultValue style={{ fontWeight: "bold" }}>
                    Choose car brand
                  </option>

                  {carBrands &&
                    carBrands.map((brand, i) => {
                      return (
                        <option value={brand.brand_id} key={i}>
                          {brand.brand}
                        </option>
                      );
                    })}
                </select>

                <select
                  style={{ marginTop: "7px" }}
                  id="carColors"
                  className="form-control form-control-md"
                  onChange={(e) => setcarColor(e.target.value)}
                >
                  <option defaultValue>Choose car color</option>

                  {colors.map((color, i) => {
                    return (
                      <option value={color} key={i}>
                        {color}
                      </option>
                    );
                  })}
                </select>

                <select
                  style={{ marginTop: "7px" }}
                  id="carYear"
                  className="form-control form-control-md"
                  onChange={(e) => setcarYear(e.target.value)}
                >
                  <option defaultValue>Choose car year</option>

                  {allYears &&
                    allYears.map((year, i) => {
                      return (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      );
                    })}
                </select>
 
                <input
                  style={{ marginTop: "7px" }}
                  type="text"
                  className="form-control form-control-md"
                  id="formGroupExampleInput"
                  placeholder="Choose car model"
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                />
    
                <textarea
                  style={{ width: "505px", height: "39px", marginTop: "7px" }}
                  type="text"
                  className="form-control form-control-md"
                  id="formGroupExampleInput2"
                  placeholder="Choose discription"
                  onChange={(e) => {
                    setdesc(e.target.value);
                  }}
                />

                <input
                  style={{ width: "505px", height: "39px", marginTop: "7px" }}
                  type="text"
                  className="form-control form-control-md"
                  id="formGroupExampleInput2"
                  placeholder="Price per day"
                  onChange={(e) => {
                    setDayPrice(e.target.value);
                  }}
                />
                <span style={{fontSize: "0.8rem", color:"white"}}>Add main Img </span>
                <input
                  placeholder="Main Img"
                  style={{ marginTop: "7px", padding: "2px" }}
                  type="file"
                  className="form-control "
                  title = "addMainIm"
                  id="main"
                  onChange={addMainIm}
                />
                <span style={{fontSize: "0.8rem", color:"white"}}>Add more Imgs</span>
                <input
                  name="More Img"
                  style={{ marginTop: "7px", padding: "2px" }}
                  type="file"
                  multiple
                  className="form-control"
                  id="formGroupExampleInput"
                  onChange={handleChange}
                />

              </form>

              <Button
                style={{ width: "156px", marginTop: "7PX" }}
                className="addcar"
                disabled={enable}
                onClick={addToData}
              >
                addCar
              </Button>
            </Card.Body>
          </div>
        </Card>
      </center>
    </>
  );
};
export default AddNewCar;
