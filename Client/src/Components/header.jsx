import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 
import homeImage from '../assets/home.png'; 
import logoutImage from '../assets/logout.png'; 

import "../CSS/header.css"; 



function Header() {
  
const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef(null);  // Reference to the menu
const navigate = useNavigate();



const toggleMenu = () => {
  setMenuOpen(!menuOpen);
};

const closeMenu = () => {
  setMenuOpen(false);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen]);


   const logout = async() => {
    const logout = await fetch('http://localhost:3000/users/logout', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      
      credentials: 'include'
  });
  alert("You have been successfully logged out!");
  navigate('/'); 
};


    return(
        <header className="topnav">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        <Link className="L1" to="/"> 
          <img src= {homeImage} style={{ marginRight: '20px' }} alt="Go to Home" />
        </Link>
        <Link className="L1" to="/" onClick={logout}>
          <img src= {logoutImage} alt="logout" />
        </Link>
        <Link to="/login">
          <img src={userImg} alt="Go to Login" />
        </Link>

        <Link to="/cart">
          <img src= {cartImg} alt="Go to Cart" />
        </Link>



        {menuOpen && (
          <nav className="menu">
            <ul>
              <li><Link to="/products/Face" onClick={closeMenu}>Face </Link></li>
              <li><Link to="/products/Body" onClick={closeMenu}>Body </Link></li>
              <li><Link to="/products/Hair" onClick={closeMenu}>Hair </Link></li>
              <li><Link to="/Orders" onClick={closeMenu}>Orders </Link></li>
              <li><Link to="/about" onClick={closeMenu}>About </Link></li>


            </ul>
          </nav>
        )}
        <h1 className="heading">Your Cosmetics</h1>


      </header>
    );
}
  

export default Header;
