const bcrypt = require('bcrypt');
const { pool, initDB } = require('./database');
require('dotenv').config();

async function seed() {
  try {
    await initDB();
    const connection = await pool.getConnection();

    // Check if admin user already exists
    const [rows] = await connection.query('SELECT * FROM users WHERE username = ?', ['admin']);
    
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        ['admin', hashedPassword, 'admin']
      );
      console.log('Seeded admin user.');
    } else {
      console.log('Admin user already exists.');
    }

    // Seed products if table is empty
    const [products] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (products[0].count === 0) {
      const dummyProducts = [
        ['Nice Laptop Pro', 'High performance laptop', 1299.99, 10],
        ['Nice Smartphone X', 'The ultimate smartphone', 899.50, 50],
        ['Nice Headphones', 'Noise-cancelling wireless headphones', 199.99, 100],
        ['Nice Smartwatch', 'Fitness and health tracker', 149.00, 30],
        ['Nice Monitor 4K', 'Crisp 4K display', 399.00, 20]
      ];
      
      for (const p of dummyProducts) {
        await connection.query(
          'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
          p
        );
      }
      console.log('Seeded products.');
    } else {
      console.log('Products already exist.');
    }

    connection.release();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
