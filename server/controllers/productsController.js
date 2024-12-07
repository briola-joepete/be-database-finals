const db = require('../config/db');

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { product_name, product_description, stock_quantity, price, sku, category_id, supplier_id } = req.body;
  try {
    await db.query(
      'INSERT INTO Products (product_name, product_description, stock_quantity, price, sku, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [product_name, product_description, stock_quantity, price, sku, category_id, supplier_id]
    );
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { product_name, product_description, stock_quantity, price, sku, category_id, supplier_id } = req.body;
  try {
    await db.query(
      'UPDATE Products SET product_name = ?, product_description = ?, stock_quantity = ?, price = ?, sku = ?, category_id = ?, supplier_id = ? WHERE product_id = ?',
      [product_name, product_description, stock_quantity, price, sku, category_id, supplier_id, id]
    );
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Products WHERE product_id = ?', [id]);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
