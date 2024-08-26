import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 




import "../CSS/home.css"; // Adjusted path to CSS/home.css

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="home-container">
      <header className="topnav">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        {menuOpen && (
          <nav className="menu">
            <ul>
              <li><Link to="/category1">Category 1</Link></li>
              <li><Link to="/category2">Category 2</Link></li>
              <li><Link to="/category3">Category 3</Link></li>
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
      <div className="background-image"></div>
    </div>
  );
}

export default Home;
