import express from 'express';
import {getAllUsers1, getUser1, createUser1, updateUser1, deleteUser1} from '../controllers/userController.js'

const router = express.Router();

// Define routes
router.get('/', getAllUsers1); // Get all users
router.get('/:id', getUser1); // Get user by ID
router.post('/', createUser1); // Create a new user
router.put('/:id', updateUser1); // Update user
router.delete('/:id', deleteUser1); // Delete user

export default router;