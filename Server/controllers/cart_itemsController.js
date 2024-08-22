import { getAllCartItems, getCartItem, createCartItem, updateCartItem, deleteCartItem } from '../models/cart_items.js';

export const getAllCartItems1 = async (req, res) => {
    const cartItems = await getAllCartItems();
    res.send(cartItems);
};

export const getCartItem1 = async (req, res) => {
    const id = req.params.id;
    const cartItem = await getCartItem(id);
    res.send(cartItem);
};

export const createCartItem1 = async (req, res) => {
    const { cart_id, product_id, quantity, price } = req.body;
    const cartItem = await createCartItem(cart_id, product_id, quantity, price);
    res.send(cartItem);
};

export const updateCartItem1 = async (req, res) => {
    const id = req.params.id;
    const { cart_id, product_id, quantity, price } = req.body;
    const updatedCartItem = await updateCartItem(id, cart_id, product_id, quantity, price);
    res.send(updatedCartItem);
};

export const deleteCartItem1 = async (req, res) => {
    const id = req.params.id;
    await deleteCartItem(id);
    res.send({ message: 'Cart item deleted successfully' });
};
