import express from 'express';
import { getAllOrderItems1, getOrderItem1, createOrderItem1, updateOrderItem1, deleteOrderItem1 } from '../controllers/order_ItemsController.js';

const router = express.Router();

// Define routes
router.get('/', getAllOrderItems1); // Get all order items
router.get('/:id', getOrderItem1); // Get order item by ID
router.post('/', createOrderItem1); // Create a new order item
router.put('/:id', updateOrderItem1); // Update order item
router.delete('/:id', deleteOrderItem1); // Delete order item

export default router;
