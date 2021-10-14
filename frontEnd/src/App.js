import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm/searchForm';
import SearchResult from './components/SearchResult/searchResult';
import AddNewCar from './components/car/AddNewCar';
import Login from "./components/Auth/Login/login"
import Register from "./components/Auth/Register/register"
import Profile from './components/Profile/profile';
import Nav from './components/NavBar/nav';
import AddReservation from './components/Reservation/reservation';
import { Route } from 'react-router';
import AdminLogin from "./components/Admin/Login/Login";
import AdminDashboard from "./components/Admin/Dashboard/Dashboard";
import AdminUsers from "./components/Admin/Users/Users";
import AdminReservations from "./components/Admin/Reservations/Reservations";
import AdminCars from "./components/Admin/Cars/Cars";
// import Slide from './components/slider/slide';
export default function App() {
  return (
    <div>
      <p>App</p>
      <AddNewCar/>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/slide">
          <Nav/>
          {/* <Slide/> */}
      <SearchForm/>
      <SearchResult/>
        </Route>
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
      {/* <AddNewCar/> */}
    {/* <AddReservation/> */}
    {/* <Profile/> */}
    </div>
  );
}
