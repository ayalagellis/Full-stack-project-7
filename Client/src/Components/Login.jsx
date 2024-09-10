import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import {getCookie} from "./UserContext"

import "../CSS/Login.css"; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [user_password, setPassword] = useState('');
    const [error, setError] = useState('');
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
                credentials: 'include'
            });


            if (response.ok) {
            const userDataCookie = getCookie('user-data');
            const decodedCookie = decodeURIComponent(userDataCookie);      
            const userData = JSON.parse(decodedCookie);        
            const { customer_id, username, manager } = userData;

                    
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
            <br></br>
            <p className= "createNew">
                Don't have an account? <a href="/create-user">Create one here</a>
            </p>
        </div>
    );
};

export default Login;
