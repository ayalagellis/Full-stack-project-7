import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/home";
import Login from "./Components/Login";
import Cart from "./Components/cart";
import Products from "./Components/Products";



function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </Router>
    );  
}

export default App;


