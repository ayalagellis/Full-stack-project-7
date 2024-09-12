import express from 'express';
import { getAllOrders1, getOrder1, createOrder1, updateOrder1, deleteOrder1 } from '../controllers/ordersController.js';
import {isManager} from '../controllers/userController.js'


const router = express.Router();

// Define routes
router.get('/', getAllOrders1); // Get all orders
router.get('/:id', getOrder1); // Get order by ID
router.post('/', createOrder1); // Create a new order
router.put('/:id', isManager, updateOrder1); // Update order
router.delete('/:id', isManager, deleteOrder1); // Delete order

export default router;
