import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateUser } from "../../actions/users";
import { storage } from "../config";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { GiCancel } from "react-icons/gi";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [ssn, setSsn] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [license, setLicense] = useState("");
  const [url, setUrl] = useState("");
  let state = useSelector((state) => {
    return { token: state.token.token };
  });
  const addImg = (e) => {
    let task = [];
    if (e.target.files[0]) {
      let license_img = e.target.files[0];
      let uploadTask = storage
        .ref(`images/${license_img.name}`)
        .put(license_img);
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
            .child(license_img.name)
            .getDownloadURL()
            .then(async (url) => {
              console.log(url);
              setLicense(url);
            });
        }
      );
      Promise.all(task);
    }
  };

  const editProfile = async () => {
    let data = {
      firstName: firstName,
      lastName: lastName,
      city: city,
      ssn: ssn,
      birthDate: birthDate,
      mobile: mobile,
      license_img: license,
    };
    console.log("data", data);
    await axios
      .put("/users/edit", data, {
        headers: { authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        console.log("result", result);
        // dispatch(updateUser(result.data.result))
        history.goBack();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  console.log(url);
  return (
    <div className="container-fluid py-5">

      <div className="container pt-5 pb-3">
   
        <center>
      
         <Card
            style={{
              width: "50rem",
              backgroundColor: "#2B2E4A",
              alignItems: "center",
              marginTop:"-110px",
              border:"12px",
            }}
          >
            <span
              style={{ marginLeft: "48rem", cursor: "pointer" }}
              onClick={() => {
                history.push("/");
              }}
            >
              <GiCancel
                style={{ color: "white", width: "18px", height: "20px" }}
              />
            </span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={{
                  width: "30%",
                  alignItems: "center",
                  marginBottom: "34px",
                  marginLeft: "13px",
                  marginTop: "57px",
                  height: "73%",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT03cbnao-fSw3yZQ1I3RoxLuul1zJjBmB1kFxNei23IZiRG9XWIiccpnrg-7IdLv1ByZI&usqp=CAU"
                class="card-img-top"
                alt="..."
              />
              <Card.Body>
                <Card.Title style={{ color: "white", textAlign: "center" }}>
                  fill out information
                </Card.Title>
                <Card.Text>
                  <input
                    className="form-control p-1  "
                    type="file"
                    onChange={addImg}
                  />
                <label className="lis" style={{color:"grey",paddingLeft: "535px",paddingBottom: "257px",fontWeight:"bold"}}    >Liscence image</label>

                  <input
                    style={{ marginTop: "5px" }}
                    className="form-control p-2"
                    type="text"
                    placeholder="firstName"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />

                  <input
                    style={{ marginTop: "5px" }}
                    className="form-control p-2"
                    type="text"
                    placeholder="lastName"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />

                  <input
                    className="form-control p-2 "
                    style={{ marginTop: "5px" }}
                    type="text"
                    placeholder="City"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />

                  <input
                    className="form-control p-2 "
                    style={{ marginTop: "5px" }}
                    type="text"
                    placeholder="Mobile"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                  <input
                    className="form-control p-2"
                    style={{ marginTop: "5px" }}
                    type="text"
                    placeholder="Ssn"
                    onChange={(e) => {
                      setSsn(e.target.value);
                    }}
                  />
                  <input
                    className="form-control p-2"
                    style={{ marginTop: "5px" }}
                    type="date"
                    placeholder="BirthDate"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                  />
                </Card.Text>
                <Button
                  style={{ width: "100px", marginTop: "5PX" }}
                  onClick={() => {
                    editProfile();
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
  );
};
export default Profile;
