import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from "./header";
import "../CSS/CreateUser.css"; 

const CreateUser = ({ is_manager = false }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [user_password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const usernameRegex = /^.{5,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate username and password
        if (!usernameRegex.test(username)) {
                    setError('Username must be at least 5 characters long.');
                    return;
         }
        
        if (!passwordRegex.test(user_password)) {
                    setError('Password must be at least 8 characters long and contain at least one letter and one number.');
                    return;
        }
        
        try {
            const response = await fetch (`http://localhost:3000/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username,
                    user_password,
                    email,
                    address,
                    is_manager
                }),
            });
            if (response.ok) {
                let endOfDay = new Date();
                endOfDay.setHours(23, 59, 59, 999); // end of the day 
                let millisecondsUntilEndOfDay = endOfDay.getTime() - new Date().getTime();
                setCookie('name', username , millisecondsUntilEndOfDay);
                setCookie('pw', user_password, millisecondsUntilEndOfDay);
        
                navigate('/login');
            } else {
                setError('Registration failed');
            }
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <div className="create-user-container">
            <Header></Header>
            <h2>Create User</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="create-user-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <br></br>

                <div className="form-row">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <br></br>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={user_password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <br></br>

                <div className="form-row">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <br></br>

                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <input type="hidden" name="is_manager" value={is_manager.toString()} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default CreateUser;
