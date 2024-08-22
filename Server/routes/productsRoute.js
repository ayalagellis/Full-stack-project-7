import express from 'express';
import { getAllProducts1, getProduct1, createProduct1, updateProduct1, deleteProduct1 } from '../controllers/productsController.js';

const router = express.Router();

// Define routes
router.get('/', getAllProducts1); // Get all products
router.get('/:id', getProduct1); // Get product by ID
router.post('/', createProduct1); // Create a new product
router.put('/:id', updateProduct1); // Update product
router.delete('/:id', deleteProduct1); // Delete product

export default router;
