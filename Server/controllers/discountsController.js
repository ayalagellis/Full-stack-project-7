import { getAllDiscounts, getDiscount, createDiscount, updateDiscount, deleteDiscount } from '../models/discounts.js';

export const getAllDiscounts1 = async (req, res) => {
    const discounts = await getAllDiscounts();
    res.send(discounts);
};

export const getDiscount1 = async (req, res) => {
    const id = req.params.id;
    const discount = await getDiscount(id);
    res.send(discount);
};

export const createDiscount1 = async (req, res) => {
    const { product_id, discount_value, start_date, end_date, discount_description } = req.body;
    const discount = await createDiscount(product_id, discount_value, start_date, end_date, discount_description);
    res.send(discount);
};

export const updateDiscount1 = async (req, res) => {
    const id = req.params.id;
    const { product_id, discount_value, start_date, end_date, discount_description } = req.body;
    const updatedDiscount = await updateDiscount(id, product_id, discount_value, start_date, end_date, discount_description);
    res.send(updatedDiscount);
};

export const deleteDiscount1 = async (req, res) => {
    const id = req.params.id;
    await deleteDiscount(id);
    res.send({ message: 'Discount deleted successfully' });
};
