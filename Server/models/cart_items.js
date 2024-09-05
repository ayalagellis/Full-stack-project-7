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

export async function getCartItemsOfCart(id) {
    const [rows] = await pool.query(`SELECT 
    p.product_name,
    p.id AS product_id,
    p.quantity,
    p.product_description,
    p.image_url,
    p.price,
    ci.id AS cart_item_id,
    ci.price AS cart_item_price,
    ci.quantity AS cart_item_quantity
    FROM 
    cart_items ci
    JOIN 
    products p ON ci.product_id = p.id
    WHERE 
    ci.cart_id = ?`, [id]);
    return rows;
}


// Create a new cart item
export async function createCartItem(cart_id, product_id, quantity, price) {
    const [existingItems] = await pool.query(`
        SELECT * FROM cart_items
        WHERE cart_id = ? AND product_id = ?
    `, [cart_id, product_id]);
    if (existingItems.length > 0) {
        // If the item exists, update the quantity
        const existingItem = existingItems[0];
        const newQuantity = existingItem.quantity + quantity;

        const [result] = await pool.query(`
            UPDATE cart_items
            SET quantity = ?
            WHERE cart_id = ? AND product_id = ?
        `, [newQuantity, cart_id, product_id]);
        return result;
    }
    else{

    const [result] = await pool.query(`
    INSERT INTO cart_items (cart_id, product_id, quantity, price)
    VALUES (?, ?, ?, ?)
    `, [cart_id, product_id, quantity, price]);

    return result;
}
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
