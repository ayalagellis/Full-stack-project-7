import { getAllCarts, getCart, createCart, updateCart, deleteCart } from '../models/cart.js';

export const getAllCarts1 = async (req, res) => {
    const carts = await getAllCarts();
    res.send(carts);
};

export const getCart1 = async (req, res) => {
    const id = req.params.id;
    const cart = await getCart(id);
    res.send(cart);
};

export const createCart1 = async (req, res) => {
    const { customer_id, total_price } = req.body;
    const cart = await createCart(customer_id, total_price);
    res.send(cart);
};

export const updateCart1 = async (req, res) => {
    const id = req.params.id;
    const { total_price } = req.body;
    const updatedCart = await updateCart(id, total_price);
    res.send(updatedCart);
};

export const deleteCart1 = async (req, res) => {
    const id = req.params.id;
    await deleteCart(id);
    res.send({ message: 'Cart deleted successfully' });
};
