import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import { getCookie } from "./UserContext";
const userDataCookie = getCookie('user-data');
const decodedCookie = decodeURIComponent(userDataCookie);      
const userData = JSON.parse(decodedCookie);        
const customer_id = userData.customer_id;
const username = userData.username;
const manager = userData.manager;
const cart_id = userData.cart_id;
const total_price = userData.total_price;


import "../CSS/orders.css"; // Add any required CSS

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (username){
            fetchOrders();
        }
    }, [username, navigate]);

    const fetchOrders = async () => {
        try {
            const baseUrl = 'http://localhost:3000/orders';
            const url = manager
                ? baseUrl
                : `${baseUrl}?customer_id=${user.id}`; // Fetch only user-specific orders if not a manager

            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const ordersData = await response.json();
            setOrders(ordersData);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="order-list">
                {!username ? (
                    <p>You must be logged in to view orders.</p>
                ) : (
                    orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="order-item">
                                <p>Shipping Address: {order.shipping_address}</p>
                                <p>Order Date: {order.order_date}</p>
                                <p>Status: {order.order_status}</p>
                                <p>Total Price: ${order.total_price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No orders found.</p>
                    )
                )}
            </div>
        </>
    );
}

export default Orders;
