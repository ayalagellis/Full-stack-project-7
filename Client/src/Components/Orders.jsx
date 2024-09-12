import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import { getCookie } from "./UserContext";
const userDataCookie = getCookie('user-data');
let userData = { customer_id: null, username: null, manager: 0, cart_id: null, total_price: '0' };



import "../CSS/orders.css"; // Add any required CSS

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (userData.username){
            fetchOrders();
        }
    }, [userData.username, navigate]);

    const fetchOrders = async () => {
        try {
            const manager = userData.manager;

            // const baseUrl = 'http://localhost:3000/orders';
            // const url = manager===1
            //     ? baseUrl
            //     : `${baseUrl}?customer_id=${user.id}`; // Fetch only user-specific orders if not a manager
            let response = 0;
                if(manager === 1)
                {
                    response = await fetch(`http://localhost:3000/orders`);
                    
                }
                else{
                    response = await fetch(`http://localhost:3000/orders?customer_id=${customer_id}`);
                }

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
