import React from "react";
import "./App.css";
import SearchResult from "./components/SearchResult/searchResult";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import Profile from "./components/Profile/profile";
import Nav from "./components/NavBar/nav";
import AddReservation from "./components/Reservation/reservation";
import { Route } from "react-router";
import AdminLogin from "./components/Admin/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import AdminUsers from "./components/Admin/Users/Users";
import AdminReservations from "./components/Admin/Reservations/Reservations";
import AdminCars from "./components/Admin/Cars/Cars";
import ResevationDash from "./components/DashReservation/dashreservation";
import UpdateCar from "./components/car/UpdateCar";
import MyCars from "./components/car/Mycars";
import Home from "./components/home/home";
import { Switch } from "react-router";
import Contact from "./components/home/Contact";
export default function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/myres">
          <ResevationDash />
        </Route>
        <Route exact path="/about">{/* about */}</Route>
        <Route exact path="/contact"><Contact/></Route>
        <Route exact path="/addRes">
          <AddReservation />
        </Route>
        <Route exact path="/mycars">
          <MyCars />
        </Route>
        <Route exact path="/updateCar/:id">
          <UpdateCar />
        </Route>
        <Route exact path="/result">
          <SearchResult />
        </Route>
      </Switch>

      <Route exact path="/admin/login">
        <AdminLogin />
      </Route>

      <Route exact path="/admin/dashboard">
        <AdminDashboard />
      </Route>

      <Route exact path="/admin/users">
        <AdminUsers />
      </Route>

      <Route exact path="/admin/reservations">
        <AdminReservations />
      </Route>

      <Route exact path="/admin/cars">
        <AdminCars />
      </Route>
    </div>
  );
}

