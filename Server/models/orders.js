import pool from '../db.js';

// Get all orders
export async function getAllOrders() {
    const [rows] = await pool.query("SELECT * FROM orders");
    return rows;
}

// Get a specific order by ID
export async function getOrder(id) {
    const [rows] = await pool.query("SELECT * FROM orders WHERE id = ?", [id]);
    return rows[0];
}

// Create a new order
export async function createOrder(customer_id, shipping_address, order_status, total_price) {
    const [result] = await pool.query(`
    INSERT INTO orders (customer_id, shipping_address, order_status, total_price)
    VALUES (?, ?, ?, ?)
    `, [customer_id, shipping_address, order_status, total_price]);
    return result;
}

// Update an existing order
export async function updateOrder(orderId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = Object.keys(updateData)
            .map(key => `${key} = ?`)
            .join(', ');

        const [result] = await pool.query(`UPDATE orders SET ${setClause} WHERE id = ?`, [...Object.values(updateData), orderId]);

        return result;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
}

// Delete an order
export async function deleteOrder(orderId) {
    const [result] = await pool.query("DELETE FROM orders WHERE id = ?", [orderId]);
    return result;
}
