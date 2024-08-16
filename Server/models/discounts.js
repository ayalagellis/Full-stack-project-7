import pool from '../db.js';

// Get all discounts
export async function getAllDiscounts() {
    const [rows] = await pool.query("SELECT * FROM discounts");
    return rows;
}

// Get a specific discount by ID
export async function getDiscount(id) {
    const [rows] = await pool.query("SELECT * FROM discounts WHERE discount_id = ?", [id]);
    return rows[0];
}

// Create a new discount
export async function createDiscount(product_id, discount_value, start_date, end_date, discount_description) {
    const [result] = await pool.query(`
    INSERT INTO discounts (product_id, discount_value, start_date, end_date, discount_description)
    VALUES (?, ?, ?, ?, ?)
    `, [product_id, discount_value, start_date, end_date, discount_description]);
    return result;
}

// Update an existing discount
export async function updateDiscount(discountId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = Object.keys(updateData)
            .map(key => `${key} = ?`)
            .join(', ');

        const [result] = await pool.query(`UPDATE discounts SET ${setClause} WHERE discount_id = ?`, [...Object.values(updateData), discountId]);

        return result;
    } catch (error) {
        console.error('Error updating discount:', error);
        throw error;
    }
}

// Delete a discount
export async function deleteDiscount(discountId) {
    const [result] = await pool.query("DELETE FROM discounts WHERE discount_id = ?", [discountId]);
    return result;
}
