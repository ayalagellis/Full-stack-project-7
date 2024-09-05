import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import "../CSS/Login.css"; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [user_password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useUser(); // Get the setUser function from context
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send login request to the server
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    user_password,
                }),
            });


            if (response.ok) {
                // Handle successful login

                const loginData = await response.json();
                const { id, username, is_manager } = loginData; // Extract user ID and token


                const customer_id = id;

                const cartResponse = await fetch('http://localhost:3000/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        customer_id
                    }),
                });

                if (!cartResponse.ok) {
                    throw new Error('Failed to create cart');
                }

               const cartData = await cartResponse.json();
              // Store user details in context

                 setUser({ id, username, is_manager, cartData });


                alert('Login successful');

                navigate('/');
            } else {
                setError('Login failed. Please check your username and password.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <Header></Header>
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <a href="/create-user">Create one here</a>
            </p>
        </div>
    );
};

export default Login;
