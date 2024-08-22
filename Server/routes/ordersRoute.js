import express from 'express';
import { getAllOrders1, getOrder1, createOrder1, updateOrder1, deleteOrder1 } from '../controllers/ordersController.js';

const router = express.Router();

// Define routes
router.get('/', getAllOrders1); // Get all orders
router.get('/:id', getOrder1); // Get order by ID
router.post('/', createOrder1); // Create a new order
router.put('/:id', updateOrder1); // Update order
router.delete('/:id', deleteOrder1); // Delete order

export default router;
