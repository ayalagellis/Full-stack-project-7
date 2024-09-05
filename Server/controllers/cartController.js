import { getAllCarts,getCartByCustomerId, getCart, createCart, updateCart, deleteCart } from '../models/cart.js';
import {createOrder} from '../models/orders.js';
import {createOrderItem} from '../models/order_items.js';
import {getProduct, updateProduct} from '../models/products.js';
import {getCartItemsOfCart, deleteCartItem} from '../models/cart_items.js'
import pool from '../db.js';





export const getAllCarts1 = async (req, res) => {
    const carts = await getAllCarts();
    res.send(carts);
};

export const getCart1 = async (req, res) => {
    const id = req.params.id;
    const cart = await getCart(id);
    res.send(cart);
};

// export const getCartByCustomerId1 = async (req, res) => {
//     const customer_id = req.params.customer_id;
//     const cart = await getCartByCustomerId(customer_id);
//     res.send(cart);
// };



export const createCart1 = async (req, res) => {
    const customer_id = req.body.customer_id;

    const existingCart = await getCartByCustomerId(customer_id);
     if (existingCart) {
        res.send(existingCart);
     }
     else{
    const cart = await createCart(customer_id, 0);
    res.send(cart);
     }
};


export const updateCart1 = async (req, res) => {
    const id = req.params.id;
    const { total_price } = req.body;
    const updateData = {};
    if (total_price !== undefined) updateData.total_price = total_price;
    try {
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No fields to update');
        }

        const updatedCart = await updateCart(id, total_price);
        res.send(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).send('Error updating cart');
    }

};


export const deleteCart1 = async (req, res) => {
    const id = req.params.id;
    await deleteCart(id);
    res.send({ message: 'Cart deleted successfully' });
};


// Function to process a cart and create an order
export const processCart = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { cartId, shippingAddress } = req.body;

        const cart = await getCart(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }

        const cartItems = await getCartItemsOfCart(cartId);

        if (cartItems.length === 0) {
            throw new Error('No items in the cart');
        }

        // Update product quantities
        for (const item of cartItems) {
            const productId = item.product_id;
            const quantityToUpdate = item.cart_item_quantity;
            const product = await getProduct(productId);


            if (product) {
                const newQuantity = product.quantity - quantityToUpdate;
                if (newQuantity < 0) {
                    throw new Error(`Not enough stock for product ID ${productId}`);
                }
                await updateProduct(productId, { quantity: newQuantity });
            } else {
                throw new Error(`Product ID ${productId} not found`);
            }
        }

        // Create the order
        const { customer_id, total_price } = cart;
        const orderStatus = 'pending'; // Initial order status
        const order = await createOrder(customer_id, shippingAddress, orderStatus, total_price);

        // Create order items
         for (const item of cartItems) {
             await createOrderItem(order.insertId, item.product_id, item.cart_item_quantity, item.price);
         }

        // Delete cart items
        for (const item of cartItems) {
            await deleteCartItem(item.cart_item_id);
        }

        // Delete the cart
        await deleteCart(cartId);

        await connection.commit();
        res.json({ success: true, orderId: order.insertId });

    } catch (error) {
        await connection.rollback();
        console.error('Error processing cart:', error);
        res.status(500).json({ success: false, error: error.message });
    } finally {
        connection.release();
    }
};
