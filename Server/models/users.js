import pool from '../db.js';


//check if manager
export async function is_manager(id) {
    const [rows] = await pool.query("SELECT is_manager FROM users WHERE id = ?", [id]);
    return rows[0];
}

// Get all users
export async function getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

// Get a specific user by ID
export async function getUser(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
}
// Get a specific user by username
export async function getUserByUsername(username) {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    return rows[0];
}


// Create a new user
export async function createUser(first_name, last_name, username, user_password, email, address, is_manager) {
    const [result] = await pool.query(`
    INSERT INTO users (first_name, last_name, username, user_password, email, address, is_manager)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [first_name, last_name, username, user_password, email, address, is_manager]);
    console.log(result)
    return result;
}

// Update an existing user
export async function updateUser(userId, updateData) {
    try {
        if (Object.keys(updateData).length === 0) {
            throw new Error('No fields to update');
        }

        const setClause = Object.keys(updateData)
            .map(key => `${key} = ?`)
            .join(', ');

        const [result] = await pool.query(`UPDATE users SET ${setClause} WHERE id = ?`, [...Object.values(updateData), userId]);

        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Delete a user
export async function deleteUser(userId) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [userId]);
    return result;
}
