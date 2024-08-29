import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 
import Header from "./header";




import "../CSS/home.css"; // Adjusted path to CSS/home.css

function Home() {

  return (
    <div className="home-container">
        <Header/>
      <div className="background-image"></div>
    </div>
  );
}

export default Home;
