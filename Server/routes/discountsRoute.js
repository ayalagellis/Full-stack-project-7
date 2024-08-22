import express from 'express';
import { getAllDiscounts1, getDiscount1, createDiscount1, updateDiscount1, deleteDiscount1 } from '../controllers/discountsController.js';

const router = express.Router();

// Define routes
router.get('/', getAllDiscounts1); // Get all discounts
router.get('/:id', getDiscount1); // Get discount by ID
router.post('/', createDiscount1); // Create a new discount
router.put('/:id', updateDiscount1); // Update discount
router.delete('/:id', deleteDiscount1); // Delete discount

export default router;
