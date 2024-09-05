import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Thanks() {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // Initialize navigate

    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');



    const handleReturnHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div>
            <h1>Thank You for Your Order!</h1>
            <p>Your order ID is: {orderId}</p>
            <button onClick={handleReturnHome}>Return to home page</button>
        </div>
    );
}

export default Thanks;



