import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";

const Dashboard = () => {
  return (
    <div>
      <p>Admin Dashboard</p>
      <Link to="/admin/users">Users</Link> <br/>
      <Link to="/admin/cars">Cars</Link><br/>
      <Link to="/admin/reservations">Reservations</Link><br/>
    </div>
  );
};

export default Dashboard;
