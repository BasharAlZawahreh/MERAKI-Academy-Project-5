import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/searchForm";
import SearchResult from "./components/SearchResult/searchResult";
import AddNewCar from "./components/car/AddNewCar";
import Login from "./components/Auth/Login/login";
import Profile from "./components/Profile/profile";
import { Route } from "react-router";

//Admin
import AdminLogin from "./components/Admin/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import AdminUsers from "./components/Admin/Users/Users";
import AdminReservations from "./components/Admin/Reservations/Reservations";
import AdminCars from "./components/Admin/Cars/Cars";

export default function App() {
  return (
    <div>
      <p>App</p>
      {/* <Login /> */}
      {/* <AddNewCar/> */}
      {/* <Profile /> */}

      <Route path="/admin/login">
        <AdminLogin />
      </Route>

      <Route path="/admin/dashboard">
        <AdminDashboard />
      </Route>

      <Route path="/admin/users">
        <AdminUsers />
      </Route>

      <Route path="/admin/reservations">
        <AdminReservations />
      </Route>

      <Route path="/admin/cars">
        <AdminCars />
      </Route>
    </div>
  );
}
