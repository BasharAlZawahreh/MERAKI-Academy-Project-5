import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm/searchForm';
import SearchResult from './components/SearchResult/searchResult';
import AddNewCar from './components/car/AddNewCar';
import Login from "./components/Auth/Login/login"
import Profile from './components/Profile/profile';
import Nav from './components/NavBar/nav';

export default function App() {
  return (
    <div>
      <p>App</p>
      {/* <AddNewCar/> */}
    <Nav/>
      {/* <Login/> */}
    {/* <Profile/> */}
    </div>
  );
}
