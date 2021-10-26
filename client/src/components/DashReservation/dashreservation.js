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
            <th>Number</th>
            <th>PickUp Date</th>
            <th>Return Date</th>
            <th>Amount</th>
            <th>Brand</th>
            <th>Delete</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {show &&
            state.reservations &&
            state.reservations.map((elem, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{elem.PickUpDate}</td>
                  <td>{elem.returnDate}</td>
                  <td>{elem.amount}</td>
                  <td>{elem.brand}</td>

                  <td>
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
                  <td>
                    {true? (
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
