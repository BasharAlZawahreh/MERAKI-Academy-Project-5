import React from "react";
import { Link } from "react-router-dom";
import Login from "../../Admin/Login/Login";
import Cars from "../Cars/Cars";
import Users from "../Users/Users";
import Reservations from "../Reservations/Reservations";

const Nav = () => {
  return (
    <div>
      <Link to={Login} /> 
      <Link to={Cars} />
      <Link to={Users} />
      <Link to={Reservations} />
    </div>
  );
};

export default Nav;
