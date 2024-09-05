import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { useUser } from './UserContext';
//import {Thanks} from './Thanks';
import "../CSS/cart.css";


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isShippingAddressProvided, setIsShippingAddressProvided] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpiry, setCreditCardExpiry] = useState('');
    const [creditCardCVC, setCreditCardCVC] = useState('');
    const navigate = useNavigate(); 
    const { user } = useUser();

    const cartData = user?.cartData || {};
    const cartId = cartData.id || 0;
    const totalPrice = cartData.total_price || 0;

    useEffect(() => {
        if (cartId) {
            fetchCartItems();
        }
    }, [cartId]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/cart-items/${cartId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            //const cartItems = await response.json();
            //setCartItems(cartItems);
            //console.log(cartItems);
           const cartItemss = await response.json();
           setCartItems(cartItemss);
           console.log(cartItemss);


        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    const handleShippingAddressSubmit = (e) => {
        e.preventDefault();
        setIsShippingAddressProvided(true);
    };

    const handleCreditCardSubmit = async (e) => {
        e.preventDefault();
        try {

            // const numericCartId = parseInt(cartId, 10);
            //console.log('cartId:', cartId);
            //console.log('shippingAddress:', shippingAddress);
        
            const response = await fetch(`http://localhost:3000/cart/${cartId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId,
                    shippingAddress
                })
            });
            if (response.ok) {
                const result = await response.json();
                const { orderId } = result; // Assuming the response contains the new order ID
                navigate(`/thank-you?orderId=${orderId}`); // Pass orderId as a query parameter
            } else {
                console.error('Submission failed');
            }
        } catch (err) {
            console.error('Submission failed:', err);
        }
    };

    return (
        <div className="container">
            <Header />
            <h1>Shopping Cart</h1>
            <br></br>
            {cartItems.length > 0 ? (
                <>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index + 1} className="product-item">
                                <img src={item.image_url} alt={item.product_name} className="product-image" />
                                <div className="product-details">
                                    <h2 className="product-name">{item.product_name}</h2>
                                    <p>{item.product_description}</p>
                                    <p className="product-price">Price: ${item.cart_item_price}</p>
                                    <p>Quantity: {item.cart_item_quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h1>Subtotal: ${totalPrice}</h1>
                    <button onClick={() => setIsCheckingOut(true)}>Checkout</button>
                    {isCheckingOut && (
                        <>
                            {!isShippingAddressProvided ? (
                                <form className="shipping-address-form" onSubmit={handleShippingAddressSubmit}>
                                    <h2>Enter Shipping Address</h2>
                                    <label>
                                        Shipping Address:
                                        <input
                                            type="text"
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Continue to Payment</button>
                                </form>
                            ) : (
                                <form className="checkout-form" onSubmit={handleCreditCardSubmit}>
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
                    )}
                </>
            ) : (
                <p>No items in the cart</p>
            )}
        </div>
    );
}

export default Cart;
