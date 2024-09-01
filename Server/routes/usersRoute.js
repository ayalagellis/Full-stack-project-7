import express from 'express';
import {getAllUsers1,login, getUser1, createUser1, updateUser1, deleteUser1, logout} from '../controllers/userController.js'


const router = express.Router();

// Define routes
router.get('/', getAllUsers1); // Get all users
router.post('/login', login); // login
router.get('/:id', getUser1); // Get user by ID
router.post('/', createUser1); // Create a new user
router.put('/:id', updateUser1); // Update user
router.delete('/:id', deleteUser1); // Delete user
router.post('/logout', logout); // logout user


export default router;