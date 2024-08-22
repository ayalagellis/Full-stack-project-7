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
    const updatedOrder = await updateOrder(id, shipping_address, order_status, total_price);
    res.send(updatedOrder);
};

export const deleteOrder1 = async (req, res) => {
    const id = req.params.id;
    await deleteOrder(id);
    res.send({ message: 'Order deleted successfully' });
};
