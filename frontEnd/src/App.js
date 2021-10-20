import React from "react";
// import "./App.css";
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
import AddRates from "./components/Rate/rates";
import CarInfo from "./components/car/CarInfo/info";
import Contact from "./components/home/Contact";
import Footer from "./components/Footer/footer";
import AddNewCar from "./components/car/AddNewCar";

import Payment from './components/Payment/payment'

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
        <Route exact path="/searchResul">
         <SearchResult/>
        </Route>
        <Route exact path="/about">
          {/* about */}
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route  path="/addRes/:id">
          <AddReservation />
        </Route>
        <Route path="/editprofile">
        < Profile/>
        </Route>
        <Route exact path="/mycars">
          <MyCars />
          {/* <Payment/> */}
         
        </Route>
        <Route  path="/updateCar/:id">
          <UpdateCar />
        </Route>
        <Route  path="/addCar">
          <AddNewCar/>
        </Route>
        <Route exact path="/result">
          <SearchResult />
        </Route>
        <Route  path="/rate/:id">
        <AddRates />
      </Route>
      <Route path="/carinfo/:id">
        <CarInfo />
      </Route>
      </Switch>
<Footer/>
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