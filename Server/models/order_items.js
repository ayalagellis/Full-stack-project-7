import pool from '../db.js';

// Get all order items
export async function getAllOrderItems() {
    const [rows] = await pool.query("SELECT * FROM order_items");
    return rows;
}

// Get a specific order item by ID
export async function getOrderItem(id) {
    const [rows] = await pool.query("SELECT * FROM order_items WHERE id = ?", [id]);
    return rows[0];
}

// Create a new order item
export async function createOrderItem(order_id, product_id, quantity, price) {
    const [result] = await pool.query(`
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
    `, [order_id, product_id, quantity, price]);
    return result;
}

// Update an existing order item
export async function updateOrderItem(orderItemId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = Object.keys(updateData)
            .map(key => `${key} = ?`)
            .join(', ');

        const [result] = await pool.query(`UPDATE order_items SET ${setClause} WHERE id = ?`, [...Object.values(updateData), orderItemId]);

        return result;
    } catch (error) {
        console.error('Error updating order item:', error);
        throw error;
    }
}

// Delete an order item
export async function deleteOrderItem(orderItemId) {
    const [result] = await pool.query("DELETE FROM order_items WHERE id = ?", [orderItemId]);
    return result;
}
