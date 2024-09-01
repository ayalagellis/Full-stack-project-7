import pool from '../db.js';

// Get all carts
export async function getAllCarts() {
    const [rows] = await pool.query("SELECT * FROM cart");
    return rows;
}

// Get a specific cart by ID
export async function getCart(id) {
    const [rows] = await pool.query("SELECT * FROM cart WHERE id = ?", [id]);
    return rows[0];
}

export async function getCartByCustomerId(customer_id) {
    const [rows] = await pool.query(`
        SELECT * FROM cart WHERE customer_id = ?
    `, [customer_id]);
    return rows[0];
}


// Create a new cart
export async function createCart(customer_id, total_price) {
    const [result] = await pool.query(`
    INSERT INTO cart (customer_id, total_price)
    VALUES (?, ?)
    `, [customer_id, total_price]);
    return result;
}

// Update an existing cart
export async function updateCart(cartId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }
        const [currentTotalPriceRows] = await pool.query('SELECT total_price FROM cart WHERE id = ?', [cartId]);
        const currentTotalPrice = currentTotalPriceRows[0]?.total_price || 0;

        const newTotalPrice = parseFloat(currentTotalPrice) + parseFloat(updateData.total_price);

        const [result] = await pool.query('UPDATE cart SET total_price = ? WHERE id = ?', [newTotalPrice, cartId]);
        return result;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
}

// Delete a cart
export async function deleteCart(cartId) {
    const [result] = await pool.query("DELETE FROM cart WHERE id = ?", [cartId]);
    return result;
}
