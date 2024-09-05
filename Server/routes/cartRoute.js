import express from 'express';
import { getAllCarts1, processCart, getCart1,createCart1, updateCart1, deleteCart1 } from '../controllers/cartController.js';

const router = express.Router();

// Define routes
router.get('/', getAllCarts1); // Get all carts
router.get('/:id', getCart1); // Get cart by ID
//router.get('/:customer_id', getCartByCustomerId1); // Get cart by customer ID
router.post('/', createCart1); // Create a new cart
router.post('/:id', processCart); // Create a order
router.put('/:id', updateCart1); // Update cart
router.delete('/:id', deleteCart1); // Delete cart

export default router;
