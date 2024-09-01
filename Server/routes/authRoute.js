import express from 'express';
import { getUserByUsername, createUser } from '../models/users.js';
import {createCart1, getCartByCustomerId1} from '../controllers/cartController.js'
import { verifyPassword, generateToken, hashPassword } from '../helper.js';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).send('User not found');
        }
        const validPassword = await verifyPassword(password, user.user_password);
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }
        const token = generateToken(user.id);
        res.cookie('User', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        const cart = await createCartIfNotExists(user.id);
        res.json({
            message: 'Logged in',
            user: {
                id: user.id,
                username: user.username,
            },
            cartId: cart.id
        });

    } catch (error) {
        res.status(500).send('Server error');
    }
});




async function createCartIfNotExists(userId) {
    // Check if cart already exists for this user
    const existingCart = await getCartByCustomerId1(userId);
    if (existingCart) {
        return existingCart;
    }
    // Create a new cart 
    const cart = await createCart1(userId);
    return cart;
}



export default router;
