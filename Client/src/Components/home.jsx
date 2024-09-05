import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImg from '../assets/user.png'; 
import cartImg from '../assets/grocery-store.png'; 
import Header from "./header";




import "../CSS/home.css"; // Adjusted path to CSS/home.css  <div className="background-image"></div>

function Home() {

  return (
    <div className="home-container">
        <Header/>
        <div className="video-container">
        <video autoPlay loop muted>
          <source src="/videos/VIDEO.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
        <video autoPlay loop muted>
          <source src="/videos/VIDEO.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
        <video autoPlay loop muted>
          <source src="/videos/VIDEO.mp4" type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
        </div>
       <div id="DivJUST">
           <p id="PJUST1">IT WAS NEVER JUST ABOUT MAKEUP</p>   
           <p id="PJUST2">Enhance your natural beauty with highly efficient formulation</p>   
       </div>


       <div className="image-buttons-container">
         <Link to="/products/Face" >
          <button className="image-button">
            <img src="/pictures/pic1.jpeg" alt="Pic 1" />
            <h3 className="imageH">Face</h3>
          </button>
        </Link>
        <Link to="/products/Body" >
           <button className="image-button">
             <img src="/pictures/pic2.jpeg" alt="Pic 2" />
             <h3 className="imageH">Body</h3>
          </button>
        </Link>
        <Link to="/products/Hair">
          <button className="image-button">
            <img src="/pictures/pic3.jpeg" alt="Pic 3" />
            <h3 className="imageH">Hair</h3>
         </button>
        </Link>
       </div>
    
       
       <div className="footer-container">
          <h2>#NATURALCOSMETICS ISRAEL</h2>
          <p>Follow, share, and become a part of the community</p>
          <p>The colorful world of NaturalCosmetics</p>
         <div className="social-icons">
            <a href="https://www.facebook.com/people/Revuele/100090710754315/" target="_blank" rel="noopener noreferrer">
             <img src="/icons/facebook.png" alt="Facebook" />
            </a>
            <div className="divider">|</div>
            <a href="https://youtu.be/t1MXXwrugJk?si=tNGNLoiLI7nul7nh" target="_blank" rel="noopener noreferrer">
             <img src="/icons/youtube.png" alt="YouTube" />
            </a>
            <div className="divider">|</div>
            <a href="https://www.instagram.com/revuele/" target="_blank" rel="noopener noreferrer">
             <img src="/icons/instagram.png" alt="Instagram" />
            </a>
         </div>

        </div>

        <a 
          href="https://api.whatsapp.com/send?phone=9720544400188&text=Hi%20NaturalCosmetics%2C%20I%20would%20appreciate%20your%20help%20%3A)" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-button"
        >
           <img src="/icons/whatsapp.png" alt="WhatsApp" />
       </a>

       <div className="contact-address-container">
          <div className="contact-section">
            <h2 className="Hf">Contact Us:</h2>
            <p className="Pf">Phone: 02-5234567</p>
            <p className="Pf">Email:NaturalCosmetics@gmail.com </p>
         </div>
         <div className="address-section">
           <h2 className="Hf">Address:</h2>
           <p className="Pf">Jerusalem Street 5</p>
           <p className="Pf">Jerusalem, Israel</p>
         </div>
       </div>

      </div>
  );
}

export default Home;
