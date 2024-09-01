import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./header";
import { Link } from "react-router-dom";
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom'; 

import "../CSS/cart.css"; 



function Cart() {
    const [cartItems, setcartItems] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpiry, setCreditCardExpiry] = useState('');
    const [creditCardCVC, setCreditCardCVC] = useState('');
    const { user } = useUser(); 
    const cartId = user.cartData.id;
    const totalPrice = user.cartData.total_price

    useEffect(() => {
        console.log(user)
        console.log(user.cartData.id)

        fetchCartItems();
    }, []);

    
        const fetchCartItems = async () => {
          try {
            //const response = await fetch(`http://localhost:3000/cart-items/cartId=${cartId}`);
            const response = await fetch(`http://localhost:3000/cart-items/${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const cartItemss = await response.json();
            setcartItems(cartItemss);
            console.log(cartItems)
          } catch (error) {
            console.error('Failed to fetch cart items:', error);
          }
        };


    return(
        <>
         <Header/>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <h2>{item.product_name}</h2>
                            <p>{item.product_description}</p>
                            <img src={item.image_url} alt={item.product_name} />
                            <p>Price: ${item.cart_item_price}</p>
                            <p>Quantity: {item.cart_item_quantity}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No items in the cart</p>
            )}
        <h1>Subtotal: {totalPrice}</h1>
        <button onClick = {()=>setIsCheckingOut(true)}>Checkout</button>
        {isCheckingOut && (
                <form  className="checkout-form">
                    <h2>Enter Credit Card Information</h2>
                    <label>
                        Credit Card Number:
                        <input
                            type="text"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Expiry Date (MM/YY):
                        <input
                            type="text"
                            value={creditCardExpiry}
                            onChange={(e) => setCreditCardExpiry(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        CVC:
                        <input
                            type="text"
                            value={creditCardCVC}
                            onChange={(e) => setCreditCardCVC(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Submit Payment</button>
                </form>
            )}

        </>
    );
}
  

export default Cart;
