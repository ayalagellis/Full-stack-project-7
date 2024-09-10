import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // You should store this in an environment variable


// Hash a password
export async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

// Verify a password
export async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// Generate a JWT token
// export function generateToken(userId) {
//     return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });
// }

export function generateToken(user) {
    const { username, user_password, is_manager } = user;
    return jwt.sign({ username, user_password, is_manager }, JWT_SECRET, { expiresIn: '24h' });
}


// Verify a JWT token
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}
