import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 
import homeImage from '../assets/home.png'; 
import logoutImage from '../assets/logout.png'; 
import { useUser } from './UserContext'; 

import "../CSS/header.css"; 



function Header() {
  
const [menuOpen, setMenuOpen] = useState(false);
const menuRef = useRef(null);  // Reference to the menu
const navigate = useNavigate();
const { user, setUser } = useUser();



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

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

  const logout = () => {
  setUser({ id: null, username: null, is_manager: null, cartData: {id: null, customer_id: null, total_price: null} });
  eraseCookie('name');
  eraseCookie('pw');
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
