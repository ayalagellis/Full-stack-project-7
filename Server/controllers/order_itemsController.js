import { getAllOrderItems, getOrderItem, createOrderItem, updateOrderItem, deleteOrderItem } from '../models/order_items.js';

export const getAllOrderItems1 = async (req, res) => {
    const orderItems = await getAllOrderItems();
    res.send(orderItems);
};

export const getOrderItem1 = async (req, res) => {
    const id = req.params.id;
    const orderItem = await getOrderItem(id);
    res.send(orderItem);
};

export const createOrderItem1 = async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;
    const orderItem = await createOrderItem(order_id, product_id, quantity, price);
    res.send(orderItem);
};

export const updateOrderItem1 = async (req, res) => {
    const id = req.params.id;
    const { order_id, product_id, quantity, price } = req.body;
    const updatedOrderItem = await updateOrderItem(id, order_id, product_id, quantity, price);
    res.send(updatedOrderItem);
};

export const deleteOrderItem1 = async (req, res) => {
    const id = req.params.id;
    await deleteOrderItem(id);
    res.send({ message: 'Order item deleted successfully' });
};
