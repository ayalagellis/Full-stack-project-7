import React, { useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import "../CSS/Login.css"; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [user_password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { user, setUser } = useUser(); // Get the setUser function from context
    const navigate = useNavigate();

    function getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
            if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
        }
        return null;
    }
    
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
                const { id, username, is_manager } = loginData; 
                console.log(is_manager)


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
                 console.log(user)

                 var storedNameCookie = getCookie('name');
                 var storedPwCookie = getCookie('pw');



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
