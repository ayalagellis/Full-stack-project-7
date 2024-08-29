import pool from '../db.js';


export const getProducts = async (filters) => {
    let query = 'SELECT * FROM products WHERE 1=1'; // Base query
    const queryParams = [];

    if (filters.category) {
        query += ' AND category = ?';
        queryParams.push(filters.category);
    }
    if (filters.priceMin) {
        query += ' AND price >= ?';
        queryParams.push(filters.priceMin);
    }
    if (filters.priceMax) {
        query += ' AND price <= ?';
        queryParams.push(filters.priceMax);
    }
    if (filters.name) {
        query += ' AND product_name LIKE ?';
        queryParams.push(`%${filters.name}%`);
    }

    const [rows] = await pool.query(query, queryParams);
    return rows;
};



export async function getProduct(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM products
    WHERE id = ?
    `, [id])
    return rows[0]
  }

  export async function createProduct(product_name, product_description, price, quantity, image_url, category) {
    const [result] = await pool.query(`
    INSERT INTO products (product_name, product_description, price, quantity, image_url, category)
    VALUES (?, ?, ? ,?, ?, ?)
    `, [product_name, product_description, price, quantity, image_url, category])
    return result
  }

  export async function updateProduct(productId, updateData) {
    try {
      if (Object.keys(updateData).length === 0) {   // Check if updateData is empty
        throw new Error('No fields to update');
      }
  
      const setClause = Object.keys(updateData)     // Dynamically build the SET clause of the query
        .map(key => `${key} = ?`)
        .join(', ');
    
      const [result] = await pool.query(`UPDATE products SET ${setClause} WHERE id = ?`, [...Object.values(updateData), productId]);
  
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
  

  export async function deleteProduct(productId){
    const [result] = await pool.query(`DELETE from products where id = ${productId}`)
    return result
  }
  
  
  