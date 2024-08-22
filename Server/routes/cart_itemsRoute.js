import express from 'express';
import { getAllCartItems1, getCartItem1, createCartItem1, updateCartItem1, deleteCartItem1 } from '../controllers/cart_ItemsController.js';

const router = express.Router();

// Define routes
router.get('/', getAllCartItems1); // Get all cart items
router.get('/:id', getCartItem1); // Get cart item by ID
router.post('/', createCartItem1); // Create a new cart item
router.put('/:id', updateCartItem1); // Update cart item
router.delete('/:id', deleteCartItem1); // Delete cart item

export default router;
