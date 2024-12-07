const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const productsRoutes = require('./server/routes/products');
const categoriesRoutes = require('./server/routes/categories');
const suppliersRoutes = require('./server/routes/suppliers');
const ordersRoutes = require('./server/routes/orders');
const customersRoutes = require('./server/routes/customers');

// Create MySQL Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'admin123',
  database: process.env.DB_NAME || 'store',
});

// Test Database Connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    process.exit(1); // Exit if the database connection fails
  }

  console.log('Now connected to MySQL database');
  connection.release(); // Release the connection back to the pool

  // Use Routes
  app.use('/products', productsRoutes);
  app.use('/categories', categoriesRoutes);
  app.use('/suppliers', suppliersRoutes);
  app.use('/orders', ordersRoutes);
  app.use('/customers', customersRoutes);

  // Start the server after a successful database connection
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// Export pool for use in other files
module.exports = pool.promise();
