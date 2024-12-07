const db = require('../config/db');

exports.getOrders = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Orders');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const { customer_id, product_id, quantity, unit_price, order_price, status } = req.body;
  try {
    await db.query(
      'INSERT INTO Orders (customer_id, product_id, quantity, unit_price, order_price, status) VALUES (?, ?, ?, ?, ?, ?)',
      [customer_id, product_id, quantity, unit_price, order_price, status]
    );
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { customer_id, product_id, quantity, unit_price, order_price, status } = req.body;
  try {
    await db.query(
      'UPDATE Orders SET customer_id = ?, product_id = ?, quantity = ?, unit_price = ?, order_price = ?, status = ? WHERE order_id = ?',
      [customer_id, product_id, quantity, unit_price, order_price, status, id]
    );
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Orders WHERE order_id = ?', [id]);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
