
import mysql from 'mysql2'
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'storedb',
  }).promise()

  //const result = await pool.query("select * from discounts")
//console.log(result)
export default pool;
