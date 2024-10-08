import express from 'express';
import { getProducts1, getProduct1, createProduct1, updateProduct1, deleteProduct1 } from '../controllers/productsController.js';
import {isManager} from '../controllers/userController.js'
const router = express.Router();

// Define routes
router.get('/', getProducts1); // Get products with filters
router.get('/:id', getProduct1); // Get product by ID
router.post('/', isManager, createProduct1); // Create a new product
router.put('/:id', isManager, updateProduct1); // Update product
router.delete('/:id', isManager, deleteProduct1); // Delete product


export default router;
