import { getAllCartItems, getCartItem,getCartItemsOfCart, createCartItem, updateCartItem, deleteCartItem } from '../models/cart_items.js';
import {updateCart} from '../models/cart.js'

export const getAllCartItems1 = async (req, res) => {
    const cartItems = await getAllCartItems();
    res.send(cartItems);
};

export const getCartItem1 = async (req, res) => {
    const id = req.params.id;
    const cartItem = await getCartItem(id);
    res.send(cartItem);
};

export const getCartItemsOfCart1 = async (req, res) => {
    const id = req.params.cart_id; //cart id
    const cartItem = await getCartItemsOfCart(id); //getting all cart items
    res.send(cartItem);
};


export const createCartItem1 = async (req, res) => {

   // const { cart_id, product_id, quantity, price } = req.body;
    const cart_id = req.body.cart_id;

const product_id = req.body.productId;
const quantity1 = req.body.quantity;
const price = req.body.productPrice;

    const cartItem = await createCartItem(cart_id, product_id, quantity1, price);
    let new_price = quantity1 * price;
   // await updateCart(cart_id, new_price);
    await updateCart(cart_id, { total_price: new_price });
    res.send(cartItem);
};

export const updateCartItem1 = async (req, res) => {
    const id = req.params.id;
    const { cart_id, product_id, quantity, price } = req.body;
    const updateData = {};
    if (quantity !== undefined) updateData.quantity = quantity;
    if (price !== undefined) updateData.price = price;
    try {
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No fields to update');
        }

        const updatedCartItem = await updateCartItem(id, cart_id, product_id, quantity, price);
        res.send(updatedCartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).send('Error updating cart item');
    }

};



export const deleteCartItem1 = async (req, res) => {
    const id = req.params.id;
    await deleteCartItem(id);
    res.send({ message: 'Cart item deleted successfully' });
};
