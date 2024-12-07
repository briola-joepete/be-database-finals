const db = require('../config/db');

exports.getCustomers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Customers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCustomer = async (req, res) => {
  const { first_name, last_name, email, phone_number, address, city, state, zip_code} = req.body;
  try {
    await db.query(
      'INSERT INTO Customers (first_name, last_name, email, phone_number, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone_number, address, city, state, zip_code]
    );
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone_number, address, city, state, zip_code } = req.body;
  try {
    await db.query(
      'UPDATE Customers SET first_name = ?, last_name = ?, email = ?, phone_number = ?, address = ?, city = ?, state = ?, zip_code = ? WHERE customer_id = ?',
      [first_name, last_name, email, phone_number, address, city, state, zip_code, id]
    );
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Customers WHERE customer_id = ?', [id]);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
