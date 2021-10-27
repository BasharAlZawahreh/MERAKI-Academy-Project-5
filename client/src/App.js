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
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/footer";
import AddNewCar from "./components/car/AddNewCar";
import About from "./components/about/about";
import Payment from "./components/Payment/payment";
import SliderBrand from "./components/Brand/brand";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/register">
          <Nav />
          <Register />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Nav />
          <Login />
          <Footer />
        </Route>
        <Route exact path="/">
          <Nav />
          <Home />
          <SliderBrand />
          <Footer />
        </Route>
        <Route exact path="/myres">
          <Nav />
          <ResevationDash />
          <Footer />
        </Route>
        <Route exact path="/searchResul">
          <Nav />
          <SearchResult />
          <Footer />
        </Route>
        <Route exact path="/about">
          <Nav />
          <About />
          <SliderBrand />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Nav />
          <Contact />
          <SliderBrand />
          <Footer />
        </Route>
        <Route path="/addRes/:id">
          <Nav />
          <AddReservation />
          <SliderBrand />
          <Footer />
        </Route>
        <Route path="/editprofile">
          <Nav />
          <Profile />
          <SliderBrand />
          <Footer />
          
        </Route>
        <Route exact path="/mycars">
          <Nav />
          <MyCars />
          <Footer />
          {/* <Payment/> */}
        </Route>
        <Route path="/updateCar/:id">
          <Nav />
          <UpdateCar />
          <Footer />
        </Route>
        <Route path="/addCar">
          <Nav />
          <AddNewCar />
          <Footer />
          <SliderBrand />
        </Route>
        <Route exact path="/result">
          <Nav />
          <SearchResult />
          <Footer />
        </Route>
        <Route path="/rate/:id">
          <Nav />
          <AddRates />
          <SliderBrand />
          <Footer />
        </Route>
        <Route path="/carinfo/:id">
          <Nav />
          <CarInfo />
          <Footer />
        </Route>
        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>
        <Route exact path="/admin/dashboard">
          <AdminDashboard />
        </Route>
      </Switch>
    </div>
  );
}
