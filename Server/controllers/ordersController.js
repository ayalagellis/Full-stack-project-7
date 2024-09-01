import { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } from '../models/orders.js';

export const getAllOrders1 = async (req, res) => {
    const orders = await getAllOrders();
    res.send(orders);
};

export const getOrder1 = async (req, res) => {
    const id = req.params.id;
    const order = await getOrder(id);
    res.send(order);
};

export const createOrder1 = async (req, res) => {
    const { customer_id, shipping_address, order_status, total_price } = req.body;
    const order = await createOrder(customer_id, shipping_address, order_status, total_price);
    res.send(order);
};

export const updateOrder1 = async (req, res) => {
    const id = req.params.id;
    const { shipping_address, order_status, total_price } = req.body;
    const updateData = {};
    if (shipping_address !== undefined) updateData.shipping_address = shipping_address;
    if (order_status !== undefined) updateData.order_status = order_status;
    if (total_price !== undefined) updateData.total_price = total_price;
    try {
        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No fields to update');
        }

        const updatedOrder = await updateOrder(id, shipping_address, order_status, total_price);
        res.send(updatedOrder);
        } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).send('Error updating order');
    }

};




export const deleteOrder1 = async (req, res) => {
    const id = req.params.id;
    await deleteOrder(id);
    res.send({ message: 'Order deleted successfully' });
};
