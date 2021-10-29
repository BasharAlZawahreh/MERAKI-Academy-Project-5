import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  setReservation,
  deleteReservation,
  setEditOrInsert,
  updateReservation,
} from "../../actions/reservations";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MdOutlineStarRate } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";

const ResevationDash = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const state = useSelector((state) => {
    return {
      token: state.token.token,
      reservations: state.reservation.reservations,
      car_Id: state.searches.car_Id,
      editOrInsert: state.reservation.editOrInsert,
    };
  });
  let car_id = state.car_Id;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const getReservationByuser = () => {
    axios
      .get("/reserve/user", {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        dispatch(setReservation(result.data.Reservations));
        setShow(true);
      })
      .catch((err) => {
        console.log("get reserve", err);
      });
  };

  const deleteReservationById = (id) => {
    axios
      .delete(`/reserve/${id}`, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((result) => {
        dispatch(deleteReservation(id));
      })
      .catch((err) => {
        console.log("delete reserve", err);
      });
  };
  useEffect(() => {
    getReservationByuser();
  }, []);
  return (
    <div style={{ padding: "45px" }}>
      {/* <button onClick={()=>getReservationByuser()}  >GET My Reservations</button> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }} >Number</th>
            <th style={{ textAlign: "center" }}>PickUp Date</th>
            <th style={{ textAlign: "center" }}>Return Date</th>
            <th style={{ textAlign: "center" }}>Amount</th>
            <th style={{ textAlign: "center" }}>Brand</th>
            <th style={{ textAlign: "center" }}> Delete</th>
            <th style={{ textAlign: "center" }}>Rate</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            state.reservations &&
            state.reservations.map((elem, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{moment(new Date(elem.PickUpDate)).format("YYYY-MM-DD")}</td>
                  <td style={{ textAlign: "center" }}>{moment(new Date(elem.returnDate)).format("YYYY-MM-DD")}</td>
                  <td style={{ textAlign: "center" }}>{elem.amount}</td>
                  <td style={{ textAlign: "center" }}>{elem.brand}</td>

                  <td style={{ textAlign: "center" }}>
                    {!elem.isConfirmed ? (
                      <RiDeleteBin5Line
                        style={{
                          color: "red",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deleteReservationById(elem.res_id);
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {elem.isConfirmed? (
                      <MdOutlineStarRate
                        style={{
                          color: "rgb(181, 181, 15)",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        onClick={() => history.push(`/rate/${elem.car_id}`)}
                      />
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};
export default ResevationDash;
