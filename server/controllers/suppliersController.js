const db = require('../config/db');

exports.getSuppliers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Suppliers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSupplier = async (req, res) => {
  const { supplier_name, contact_email, phone_number, address } = req.body;
  try {
    await db.query('INSERT INTO Suppliers (supplier_name, contact_email, phone_number, address) VALUES (?, ?, ?, ?)', [supplier_name, contact_email, phone_number, address]);
    res.status(201).json({ message: 'Supplier created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { supplier_name, contact_email, phone_number, address } = req.body;
  try {
    await db.query('UPDATE Suppliers SET supplier_name = ?, contact_email = ?, phone_number = ?, address = ? WHERE supplier_id = ?', [supplier_name, contact_email, phone_number, address, id]);
    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Suppliers WHERE supplier_id = ?', [id]);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
