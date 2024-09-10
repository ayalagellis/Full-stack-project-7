import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/home";
import Login from "./Components/Login";
import Cart from "./Components/cart";
import Products from "./Components/Products";
import CreateUser from "./Components/CreateUser";
import NotFound from "./Components/NotFound"; 
import Thanks from "./Components/Thanks"; 
import Orders from "./Components/Orders"; 
import About from "./Components/about"; 








function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thank-you" element={<Thanks />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );  
}

export default App;


