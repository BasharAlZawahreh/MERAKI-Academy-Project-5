import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm/searchForm";
import SearchResult from "./components/SearchResult/searchResult";
import AddNewCar from "./components/car/AddNewCar";
import Login from "./components/Auth/Login/login";
import Profile from "./components/Profile/profile";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import { Route } from "react-router";
import Users from "./components/Admin/Users/Users"
import AdminLogin from "./components/Admin/Login/Login"

export default function App() {
  return (
    <div>
      <p>App</p>
      {/* <Login /> */}
      {/* <AddNewCar/> */}
      {/* <Profile /> */}
      <Route path="/admin">
        <AdminLogin/>
        {/* <Dashboard /> */}
        <Users/>
      </Route>
    </div>
  );
}
