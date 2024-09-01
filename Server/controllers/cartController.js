import { getAllCarts,getCartByCustomerId, getCart, createCart, updateCart, deleteCart } from '../models/cart.js';

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
