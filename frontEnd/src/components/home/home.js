import React from "react";
import Slide from "../slider/slide";
import { useEffect } from "react";
import axios from "axios"

const Home = () => {
  const gitAllCars = () => {
    
  };
  useEffect(() => {
    gitAllCars();
  }, []);


  return (
    <>
      <Slide />
    </>
  );
};

export default Home;
