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
export default function App() {
  return (
    <div>
      <p>App</p>
      {/* <AddNewCar/> */}
    {/* <Nav/> */}
    <AddReservation/>
      <Login/>
      {/* <Register/> */}
    {/* <Profile/> */}
    </div>
  );
}
