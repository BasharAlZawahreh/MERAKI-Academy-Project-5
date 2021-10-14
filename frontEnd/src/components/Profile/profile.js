import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/users";
import { storage } from "../config";

const Profile = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [city, setCity] = useState();
  const [ssn, setSsn] = useState();
  const [birthDate, setBirthDate] = useState();
  const [license_img, setLicense_img] = useState(null);
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  const [url, setUrl] = useState("");
  let state = useSelector((state) => {
    return { token: state.token.token };
  });
  const addImg = (e) => {
    if (e.target.files[0]) {
      setLicense_img(e.target.files[0]);
    }
  };
  const editProfile = () => {
    let task = [];
    let data = {
      firstName: firstName,
      lastName: lastName,
      age: age,
      city: city,
      password: password,
      ssn: ssn,
      birthDate: birthDate,
      mobile: mobile,
    };
    let uploadTask = storage.ref(`images/${license_img.name}`).put(license_img);
    task.push(uploadTask);
    uploadTask.on(
      "state_change",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      async () => {
        await storage
          .ref("images")
          .child(license_img.name)
          .getDownloadURL()
          .then(async (url) => {
            data["license_img"] = url;
            setUrl(url);
          });
      }
    );
    Promise.all(task)
      .then(() => {
        data["license_img"] = url;
        //  console.log(data);
        axios
          .put("http://localhost:5000/users/edit", data, {
            headers: { authorization: `Bearer ${state.token}` },
          })
          .then((result) => {
            dispatch(updateUser(result.data.result));
            // let message=`added successfuly`
          })
          .catch((err) => {
            console.log(err);
          });

        alert("image uploaded");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="updateProfile">
      <input
        type="text"
        placeholder="firstName"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="lastName"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="City"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Ssn"
        onChange={(e) => {
          setSsn(e.target.value);
        }}
      />
      <input
        type="date"
        placeholder="BirthDate"
        onChange={(e) => {
          setBirthDate(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Mobile"
        onChange={(e) => {
          setMobile(e.target.value);
        }}
      />
      <input type="file" onChange={addImg} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          editProfile();
        }}
      >
        editProfile
      </button>
    </div>
  );
};
export default Profile;
