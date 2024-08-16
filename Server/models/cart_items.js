import pool from '../db.js';

// Get all cart items
export async function getAllCartItems() {
    const [rows] = await pool.query("SELECT * FROM cart_items");
    return rows;
}

// Get a specific cart item by ID
export async function getCartItem(id) {
    const [rows] = await pool.query("SELECT * FROM cart_items WHERE id = ?", [id]);
    return rows[0];
}

// Create a new cart item
export async function createCartItem(cart_id, product_id, quantity, price) {
    const [result] = await pool.query(`
    INSERT INTO cart_items (cart_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
    `, [cart_id, product_id, quantity, price]);
    return result;
}

// Update an existing cart item
export async function updateCartItem(cartItemId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = Object.keys(updateData)
            .map(key => `${key} = ?`)
            .join(', ');

        const [result] = await pool.query(`UPDATE cart_items SET ${setClause} WHERE id = ?`, [...Object.values(updateData), cartItemId]);

        return result;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error;
    }
}

// Delete a cart item
export async function deleteCartItem(cartItemId) {
    const [result] = await pool.query("DELETE FROM cart_items WHERE id = ?", [cartItemId]);
    return result;
}
