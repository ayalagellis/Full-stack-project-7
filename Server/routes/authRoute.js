import express from 'express';
import { getUserByUsername } from '../models/users.js'; // Adjust path as needed
import { verifyPassword, generateToken } from '../helper.js';

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
        res.send('Logged in');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Logout endpoint
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.send('Logged out');
});

export default router;
