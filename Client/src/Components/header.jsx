import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 
import homeImage from '../assets/home.png'; 
import logoutImage from '../assets/logout.png'; 



import "../CSS/header.css"; 



function Header() {
  
const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

const logout = () => {

  
};


    return(
        <header className="topnav">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <Link to="/"> 
          <img src= {homeImage} style={{ marginRight: '20px' }} alt="Go to Home" />
        </Link>
        <Link to="/" onClick={logout}>
          <img src= {logoutImage} alt="logout" />
        </Link>

        {menuOpen && (
          <nav className="menu">
            <ul>
              <li><Link to="/products/Face">Face </Link></li>
              <li><Link to="/products/Body">Body </Link></li>
              <li><Link to="/products/Hair">Hair </Link></li>
            </ul>
          </nav>
        )}
        <h1 className="heading">Your Cosmetics</h1>
        <Link to="/login">
          <img src={userImg} alt="Go to Login" />
        </Link>

        <Link to="/cart">
          <img src= {cartImg} alt="Go to Cart" />
        </Link>



      </header>
    );
}
  

export default Header;
