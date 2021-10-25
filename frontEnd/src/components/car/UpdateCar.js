import React, { useEffect, useState } from "react";
import axios from "axios";
import { storage } from "../config";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCar } from "../../actions/cars/index";
import { useHistory } from "react-router";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GiCancel } from "react-icons/gi";
const UpdateCar = ({ car }) => {
  const history = useHistory();

  const carInfo = JSON.parse(localStorage.getItem("car"));
  console.log(carInfo);

  const state = useSelector((state) => {
    return { cars: state.car.cars, token: state.token.token };
  });

  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [mainImg, setMainImg] = useState("");
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
    let task = [];
    if (e.target.files[0]) {
      let img = e.target.files[0];
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
            .then(async (url) => {
              console.log(url);
              setMainImg(url);
            });
        }
      );
      Promise.all(task);
    }
  };

  const addToData = async () => {
    let data = {
      color: carColor || carInfo.color,

      description: desc || carInfo.description,

      day_price: dayPrice || carInfo.day_price,

      main_img: mainImg || carInfo.main_img,
    };
    console.log(data, "data");

    await axios
      .put(`http://localhost:5000/car/${id}`, data, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        console.log(result);
        setMessage("updated Successfuly");
        history.push("/mycars");
      })
      .catch((err) => {
        console.log("err");
      });
  };

  return (
    <>
      <center>
        <Card
          style={{
            width: "36rem",

            backgroundColor: "#2B2E4A",

            height: "23rem",
          }}
        >
          <span
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => {
              history.push("/mycars");
            }}
          >
            <GiCancel
              style={{ color: "white", width: "18px", height: "20px" }}
            />
          </span>

          <Card.Body>
            <Card.Title style={{ color: "white" }}>Update Your Car</Card.Title>
            <Card.Text> </Card.Text>

            <form>
              <input
                style={{ marginTop: "7px", padding: "5px", height: "44px" }}
                placeholder="main img"
                type="file"
                className="form-control"
                id="formGroupExampleInput"
                onChange={addMainIm}
              />

              <select
                style={{ marginTop: "7px", height: "44px" }}
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

              <textarea
                style={{ marginTop: "7px", height: "44px" }}
                type="text"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="over view for your car's"
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
              />

              <input
                style={{ marginTop: "7px", height: "44px" }}
                type="nubmer"
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="price ber day"
                onChange={(e) => {
                  setDayPrice(e.target.value);
                }}
              />
            </form>

            <Button
              className="addcar"
              style={{ width: "156px", marginTop: "14px" }}
              type="button"
              onClick={addToData}
            >
              Save Update{" "}
            </Button>
            {message}
          </Card.Body>
        </Card>
      </center>
    </>
  );
};
export default UpdateCar;
